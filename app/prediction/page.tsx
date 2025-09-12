"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PredictionForm } from "@/components/prediction-form"
import { PredictionResults } from "@/components/prediction-results"

export interface PredictionData {
  totalIncome: number
  age: number
  yearsOfWork: number
  familySize: number
  incomeType: string
  educationType: string
  familyStatus: string
  housingType: string
  badDebt: boolean
}

export interface PredictionResult {
  approvalStatus: "approved" | "rejected" | "manual-review"
  probability: number
  riskLevel: "low" | "medium" | "high"
  creditLimit: number
  positiveFactors: string[]
  negativeFactors: string[]
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
  if (data.totalIncome > 100000) {
    score += 30
    positiveFactors.push("High income level")
  } else if (data.totalIncome > 50000) {
    score += 20
    positiveFactors.push("Stable income level")
  } else {
    score -= 10
    negativeFactors.push("Lower income level")
  }

  // Age scoring
  if (data.age >= 25 && data.age <= 55) {
    score += 15
    positiveFactors.push("Optimal age range")
  } else if (data.age < 25) {
    score -= 5
    negativeFactors.push("Young age")
  }

  // Work experience
  if (data.yearsOfWork > 5) {
    score += 15
    positiveFactors.push("Extensive work experience")
  } else if (data.yearsOfWork > 2) {
    score += 10
    positiveFactors.push("Good work experience")
  } else {
    score -= 5
    negativeFactors.push("Limited work experience")
  }

  // Bad debt
  if (data.badDebt) {
    score -= 25
    negativeFactors.push("History of bad debt")
  } else {
    score += 20
    positiveFactors.push("Clean credit history")
  }

  // Education
  if (data.educationType === "Higher education" || data.educationType === "Academic degree") {
    score += 10
    positiveFactors.push("Higher education level")
  }

  // Family status
  if (data.familyStatus === "Married") {
    score += 5
    positiveFactors.push("Married status")
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

  const creditLimit = approvalStatus === "approved" ? Math.round((data.totalIncome * 0.3) / 1000) * 1000 : 0

  return {
    approvalStatus,
    probability,
    riskLevel,
    creditLimit,
    positiveFactors,
    negativeFactors,
  }
}
