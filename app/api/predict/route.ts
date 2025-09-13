import { NextRequest, NextResponse } from "next/server";
import type { PredictionData } from "@/src/App";

// Python ML server URL
const ML_SERVER_URL = process.env.ML_SERVER_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    // Get the user data from the request
    const userData = await request.json() as PredictionData;
    
    // Process the prediction using the Python SVM model API
    const result = await predictLoanStatus(userData);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Prediction error:", error);
    
    // Fall back to the simulation if Python API fails
    try {
      // Try to parse the request again
      const clonedRequest = request.clone();
      const userData = await clonedRequest.json() as PredictionData;
      
      console.log("Falling back to simulation model...");
      const formattedData = preprocessData(userData);
      const [prediction, probability] = simulateSVMPrediction(formattedData);
      const result = formatResult(prediction, probability, userData);
      return NextResponse.json(result);
    } catch (fallbackError) {
      console.error("Fallback prediction error:", fallbackError);
      return NextResponse.json({ error: "Failed to process prediction" }, { status: 500 });
    }
  }
}

async function predictLoanStatus(data: PredictionData) {
  // Call the Python Flask API with the SVM model
  console.log(`Calling ML server at ${ML_SERVER_URL}/predict`);
  
  try {
    const response = await fetch(`${ML_SERVER_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // Add this to ensure cookies are sent and CORS works properly
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ML server error: ${response.status} - ${errorText}`);
      throw new Error(`ML server returned ${response.status}: ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error connecting to ML server:", error);
    throw error;
  }
}

function preprocessData(data: PredictionData) {
  // In a real implementation, this would transform the data to match
  // the preprocessing done in the notebook
  return {
    person_age: data.person_age,
    person_gender: data.person_gender,
    person_education: data.person_education,
    person_income: data.person_income,
    person_emp_exp: data.person_emp_exp,
    person_home_ownership: data.person_home_ownership,
    loan_amnt: data.loan_amnt,
    loan_intent: data.loan_intent,
    loan_int_rate: data.loan_int_rate,
    loan_percent_income: data.loan_percent_income / 100, // Convert from percentage to decimal
    cb_person_cred_hist_length: data.cb_person_cred_hist_length,
    credit_score: data.credit_score,
    previous_loan_defaults_on_file: data.previous_loan_defaults_on_file
  };
}

function simulateSVMPrediction(data: any): [number, number[]] {
  // This is a simplified simulation of the SVM prediction
  // In real implementation, this would be handled by the Python SVM model
  
  // Calculate a score based on key features (simplified version of SVM logic)
  let score = 0;
  
  // Credit score is a strong predictor
  if (data.credit_score >= 700) score += 20;
  else if (data.credit_score >= 650) score += 10;
  else if (data.credit_score < 600) score -= 15;
  
  // Previous defaults are critical
  if (data.previous_loan_defaults_on_file === "No") score += 25;
  else score -= 30;
  
  // Income relative to loan amount
  if (data.person_income > data.loan_amnt * 3) score += 15;
  else if (data.person_income < data.loan_amnt) score -= 10;
  
  // Credit history length
  if (data.cb_person_cred_hist_length > 5) score += 10;
  else if (data.cb_person_cred_hist_length < 2) score -= 5;
  
  // Employment experience
  if (data.person_emp_exp > 5) score += 10;
  else if (data.person_emp_exp < 1) score -= 5;
  
  // Loan to income ratio
  if (data.loan_percent_income < 0.2) score += 10;
  else if (data.loan_percent_income > 0.4) score -= 15;
  
  // Calculate probability (simplified)
  let approvalProb = Math.min(Math.max((score + 50) / 100, 0), 1);
  
  // SVM output is binary (0 or 1) with probability
  const prediction = approvalProb > 0.5 ? 1 : 0;
  const probabilities = [1 - approvalProb, approvalProb];
  
  return [prediction, probabilities];
}

function formatResult(prediction: number, probabilities: number[], data: PredictionData) {
  // Determine approval status
  let approvalStatus: "approved" | "rejected" | "manual-review";
  let riskLevel: "low" | "medium" | "high";
  
  const approvalProb = probabilities[1] * 100; // Convert to percentage
  
  if (approvalProb >= 70) {
    approvalStatus = "approved";
    riskLevel = "low";
  } else if (approvalProb >= 40) {
    approvalStatus = prediction === 1 ? "approved" : "manual-review";
    riskLevel = "medium";
  } else {
    approvalStatus = "rejected";
    riskLevel = "high";
  }
  
  // Generate factors based on the data
  const positiveFactors: string[] = [];
  const negativeFactors: string[] = [];
  
  // Credit score
  if (data.credit_score >= 700) {
    positiveFactors.push("Good credit score");
  } else if (data.credit_score < 600) {
    negativeFactors.push("Low credit score");
  }
  
  // Previous defaults
  if (data.previous_loan_defaults_on_file === "No") {
    positiveFactors.push("No history of defaults");
  } else {
    negativeFactors.push("Previous loan defaults");
  }
  
  // Income to loan ratio
  if (data.person_income > data.loan_amnt * 3) {
    positiveFactors.push("Income significantly higher than loan amount");
  } else if (data.person_income < data.loan_amnt) {
    negativeFactors.push("Income lower than loan amount");
  }
  
  // Credit history
  if (data.cb_person_cred_hist_length > 5) {
    positiveFactors.push("Established credit history");
  } else if (data.cb_person_cred_hist_length < 2) {
    negativeFactors.push("Limited credit history");
  }
  
  // Employment experience
  if (data.person_emp_exp > 5) {
    positiveFactors.push("Stable employment history");
  } else if (data.person_emp_exp < 1) {
    negativeFactors.push("Limited employment experience");
  }
  
  // Calculate recommended credit limit if approved
  const creditLimit = approvalStatus === "approved" 
    ? Math.round((data.person_income * 0.3) / 1000) * 1000 
    : 0;
  
  return {
    approvalStatus,
    probability: Math.round(approvalProb),
    riskLevel,
    creditLimit,
    positiveFactors,
    negativeFactors,
    // Include raw model output for debugging
    modelOutput: {
      prediction,
      probabilities
    }
  };
}