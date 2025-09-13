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
  approvalStatus: "approved" | "rejected" | "manual-review"
  probability: number
  riskLevel: "low" | "medium" | "high"
  creditLimit: number
  positiveFactors: string[]
  negativeFactors: string[]
  modelOutput?: {
    prediction: number
    probabilities: number[]
  }
}

export default function PredictionPage() {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePrediction = async (data: PredictionData) => {
    setIsLoading(true)

    // Simulate API call with mock prediction logic
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock prediction logic
    const mockResult = generateMockPrediction(data)
    setPredictionResult(mockResult)
    setIsLoading(false)
  }

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

function generateMockPrediction(data: PredictionData): PredictionResult {
  // Simple mock logic for demonstration
  let score = 0
  const positiveFactors: string[] = []
  const negativeFactors: string[] = []

  // Income scoring
  if (data.person_income > 100000) {
    score += 30
    positiveFactors.push("High income level")
  } else if (data.person_income > 50000) {
    score += 20
    positiveFactors.push("Stable income level")
  } else {
    score -= 10
    negativeFactors.push("Lower income level")
  }

  // Age scoring
  if (data.person_age >= 25 && data.person_age <= 55) {
    score += 15
    positiveFactors.push("Optimal age range")
  } else if (data.person_age < 25) {
    score -= 5
    negativeFactors.push("Young age")
  }

  // Work experience
  if (data.person_emp_exp > 5) {
    score += 15
    positiveFactors.push("Extensive work experience")
  } else if (data.person_emp_exp > 2) {
    score += 10
    positiveFactors.push("Good work experience")
  } else {
    score -= 5
    negativeFactors.push("Limited work experience")
  }

  // Previous loan defaults
  if (data.previous_loan_defaults_on_file === "No") {
    score += 20
    positiveFactors.push("Clean credit history")
  } else {
    score -= 25
    negativeFactors.push("History of loan defaults")
  }

  // Education
  if (data.person_education === "Master" || data.person_education === "Doctorate") {
    score += 10
    positiveFactors.push("Higher education level")
  }

  // Credit score
  if (data.credit_score >= 700) {
    score += 15
    positiveFactors.push("Excellent credit score")
  } else if (data.credit_score < 600) {
    score -= 10
    negativeFactors.push("Poor credit score")
  }

  // Convert score to probability
  const probability = Math.max(0, Math.min(100, score + 50))

  let approvalStatus: "approved" | "rejected" | "manual-review"
  let riskLevel: "low" | "medium" | "high"

  if (probability >= 70) {
    approvalStatus = "approved"
    riskLevel = "low"
  } else if (probability >= 40) {
    approvalStatus = "manual-review"
    riskLevel = "medium"
  } else {
    approvalStatus = "rejected"
    riskLevel = "high"
  }

  const creditLimit = approvalStatus === "approved" ? Math.round((data.person_income * 0.3) / 1000) * 1000 : 0
  
  // Simulate SVM model output
  const modelProb = probability / 100;
  const modelPrediction = probability >= 50 ? 1 : 0;

  return {
    approvalStatus,
    probability,
    riskLevel,
    creditLimit,
    positiveFactors,
    negativeFactors,
    modelOutput: {
      prediction: modelPrediction,
      probabilities: [1 - modelProb, modelProb]
    }
  }
}
