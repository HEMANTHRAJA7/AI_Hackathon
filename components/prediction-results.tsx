"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import type { PredictionResult } from "@/app/prediction/page"

interface PredictionResultsProps {
  result: PredictionResult | null
  isLoading: boolean
}

export function PredictionResults({ result, isLoading }: PredictionResultsProps) {
  if (isLoading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Analyzing your application...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-slate-600">Fill out the form to see your prediction results</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getApprovalIcon = () => {
    switch (result.approvalStatus) {
      case "approved":
        return <CheckCircle className="h-8 w-8 text-green-600" />
      case "rejected":
        return <XCircle className="h-8 w-8 text-red-600" />
      case "manual-review":
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />
    }
  }

  const getApprovalBadge = () => {
    switch (result.approvalStatus) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "manual-review":
        return <Badge className="bg-yellow-100 text-yellow-800">Manual Review</Badge>
    }
  }

  const getRiskBadge = () => {
    switch (result.riskLevel) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Approval Status */}
          <div className="flex items-center gap-4">
            {getApprovalIcon()}
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {result.approvalStatus === "approved" && "Application Approved"}
                {result.approvalStatus === "rejected" && "Application Rejected"}
                {result.approvalStatus === "manual-review" && "Manual Review Required"}
              </h3>
              {getApprovalBadge()}
            </div>
          </div>

          {/* SVM Probability */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Approval Probability</span>
              <span className="text-sm font-semibold text-slate-900">{result.probability}%</span>
            </div>
            <Progress value={result.probability} className="h-3" />
            <p className="text-xs text-slate-500">
              Based on SVM model analysis of your application data
            </p>
          </div>

          {/* Risk Level */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Risk Level</span>
            {getRiskBadge()}
          </div>
          
          {/* Model Confidence */}
          {result.modelOutput && (
            <div className="flex flex-col gap-1 p-3 bg-blue-50 rounded-md">
              <p className="text-xs font-medium text-blue-800">Machine Learning Confidence</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${result.modelOutput.probabilities[1] * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-blue-900">
                  {Math.round(result.modelOutput.probabilities[1] * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* Credit Limit */}
          {result.creditLimit > 0 && (
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Recommended Credit Limit</p>
                <p className="text-lg font-semibold text-green-900">${result.creditLimit.toLocaleString()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Decision Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Decision Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Positive Factors */}
          {result.positiveFactors.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Positive Factors
              </h4>
              <ul className="space-y-1">
                {result.positiveFactors.map((factor, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-center gap-2">
                    <CheckCircle className="h-3 w-3" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Negative Factors */}
          {result.negativeFactors.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Areas of Concern
              </h4>
              <ul className="space-y-1">
                {result.negativeFactors.map((factor, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-center gap-2">
                    <XCircle className="h-3 w-3" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SVM Model Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
              <path d="M12 2a4 4 0 0 0-4 4v16" />
              <path d="M8 22h8" />
              <path d="M12 2a4 4 0 0 1 4 4v2" />
              <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
              <path d="M16 19a4 4 0 0 1-8 0 4 4 0 0 1 8 0Z" />
            </svg>
            Machine Learning Model
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-md">
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Support Vector Machine (SVM)</h4>
            <p className="text-sm text-slate-600">
              This prediction was made using a Support Vector Machine learning model trained on thousands of 
              historical loan applications. The model identifies patterns in the data to predict approval likelihood.
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Key Features</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-slate-50 rounded text-sm">
                <div className="font-medium text-slate-700">Credit Score</div>
                <div className="text-xs text-slate-500">Strong predictor</div>
              </div>
              <div className="p-2 bg-slate-50 rounded text-sm">
                <div className="font-medium text-slate-700">Payment History</div>
                <div className="text-xs text-slate-500">Critical factor</div>
              </div>
              <div className="p-2 bg-slate-50 rounded text-sm">
                <div className="font-medium text-slate-700">Income</div>
                <div className="text-xs text-slate-500">Important factor</div>
              </div>
              <div className="p-2 bg-slate-50 rounded text-sm">
                <div className="font-medium text-slate-700">Loan-to-Income</div>
                <div className="text-xs text-slate-500">Key ratio</div>
              </div>
            </div>
          </div>

          {/* Prediction Confidence */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Prediction Confidence</h4>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Low</span>
                <span className="text-xs text-slate-500">High</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    result.probability >= 70 
                      ? "bg-green-500" 
                      : result.probability >= 40 
                      ? "bg-yellow-500" 
                      : "bg-red-500"
                  }`}
                  style={{ width: `${result.probability}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {result.probability < 40 && "The model has low confidence in approval."}
                {result.probability >= 40 && result.probability < 70 && "The model has moderate confidence in the prediction."}
                {result.probability >= 70 && "The model has high confidence in approval."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
