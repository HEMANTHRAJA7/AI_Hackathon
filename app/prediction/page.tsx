"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PredictionForm } from "@/components/prediction-form"
import { PredictionResults } from "@/components/prediction-results"

export interface PredictionData {
  person_age: number
  person_gender: string
  person_education: string
  person_income: number
  person_emp_exp: number
  person_home_ownership: string
  loan_amnt: number
  loan_intent: string
  loan_int_rate: number
  loan_percent_income: number
  cb_person_cred_hist_length: number
  credit_score: number
  previous_loan_defaults_on_file: string
}

export interface PredictionResult {
  approvalStatus: "approved" | "rejected"
  approvalProbability: number
  rejectionProbability: number
  riskLevel: "low" | "medium" | "high"
  creditLimit: number
  positiveFactors: string[]
  negativeFactors: string[]
}

export default function PredictionPage() {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePrediction = async (data: PredictionData) => {
    setIsLoading(true);
    setPredictionResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();

      if (!response.ok || responseData.status === 'error') {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = responseData.data; // Extract data from the successful response

      const displayResult: PredictionResult = {
        approvalStatus: result.prediction === 'Approved' ? 'approved' : 'rejected',
        approvalProbability: result.approval_probability,
        rejectionProbability: result.rejection_probability,
        riskLevel: 'low',
        creditLimit: 0,
        positiveFactors: [],
        negativeFactors: [],
      };

      setPredictionResult(displayResult);

    } catch (error) {
      console.error("Failed to fetch prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-slate-900 mb-4 text-balance">Credit Card Approval Prediction</h1>
            <p className="text-lg text-slate-600 text-pretty">
              Enter your information below to get an instant approval prediction and risk assessment.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in-up">
            <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
            <PredictionResults result={predictionResult} isLoading={isLoading} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


