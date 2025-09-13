"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Shield,
  DollarSign,
  Clock,
  Target,
  Info,
} from "lucide-react"
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
              <p className="text-sm text-slate-500 mt-2">Processing financial data with AI</p>
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
            <p className="text-slate-600 font-medium">Fill out the form to see your prediction results</p>
            <p className="text-sm text-slate-500 mt-2">Get instant AI-powered credit analysis</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isApproved = result.approvalStatus === "approved"
  const displayProbability = isApproved ? result.approvalProbability : result.rejectionProbability

  const getRiskLevel = () => {
    if (result.approvalProbability >= 0.8) return { level: "Low", color: "green", icon: Shield }
    if (result.approvalProbability >= 0.6) return { level: "Medium", color: "yellow", icon: AlertTriangle }
    return { level: "High", color: "red", icon: TrendingDown }
  }

  const riskInfo = getRiskLevel()

  const getRecommendations = () => {
    if (isApproved) {
      return [
        "Consider setting up automatic payments to maintain good credit",
        "Monitor your credit utilization ratio monthly",
        "Keep your credit accounts open to maintain credit history length",
      ]
    } else {
      return [
        "Work on improving your credit score before reapplying",
        "Consider reducing your debt-to-income ratio",
        "Build a longer credit history with responsible usage",
      ]
    }
  }

  const getKeyFactors = () => {
    const factors = []
    if (result.approvalProbability > 0.7) {
      factors.push({ factor: "Strong Credit Profile", impact: "Positive", icon: TrendingUp })
      factors.push({ factor: "Stable Income History", impact: "Positive", icon: DollarSign })
    } else {
      factors.push({ factor: "Credit Risk Indicators", impact: "Negative", icon: TrendingDown })
      factors.push({ factor: "Income vs Loan Ratio", impact: "Concern", icon: AlertTriangle })
    }
    return factors
  }

  const getApprovalIcon = () => {
    return isApproved ? (
      <CheckCircle className="h-8 w-8 text-green-600" />
    ) : (
      <XCircle className="h-8 w-8 text-red-600" />
    )
  }

  const getApprovalBadge = () => {
    return isApproved ? (
      <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">Approved</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 text-sm px-3 py-1">Rejected</Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Prediction Results
            <Info className="h-4 w-4 text-slate-400" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Status */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100">
            {getApprovalIcon()}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900">
                {isApproved ? "Application Approved" : "Application Rejected"}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {isApproved
                  ? "Congratulations! Your application meets our criteria."
                  : "Your application needs improvement in key areas."}
              </p>
              <div className="mt-2">{getApprovalBadge()}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Approval</span>
              </div>
              <div className="text-2xl font-bold text-green-900">{(result.approvalProbability * 100).toFixed(1)}%</div>
              <Progress value={result.approvalProbability * 100} className="mt-2 h-2" />
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Rejection</span>
              </div>
              <div className="text-2xl font-bold text-red-900">{(result.rejectionProbability * 100).toFixed(1)}%</div>
              <Progress value={result.rejectionProbability * 100} className="mt-2 h-2" />
            </div>
          </div>

          {/* Main Confidence Bar */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                {isApproved ? "Approval Confidence" : "Rejection Confidence"}
              </span>
              <span className="text-lg font-bold text-slate-900">{(displayProbability * 100).toFixed(1)}%</span>
            </div>
            <Progress value={displayProbability * 100} className="h-4">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${isApproved ? "bg-green-600" : "bg-red-600"}`}
                style={{ width: `${displayProbability * 100}%` }}
              />
            </Progress>
            <p className="text-xs text-slate-500">
              Based on advanced machine learning analysis of your financial profile.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="flex items-center gap-4 p-4 rounded-lg border-2"
            style={{
              borderColor: riskInfo.color === "green" ? "#10b981" : riskInfo.color === "yellow" ? "#f59e0b" : "#ef4444",
              backgroundColor:
                riskInfo.color === "green" ? "#f0fdf4" : riskInfo.color === "yellow" ? "#fffbeb" : "#fef2f2",
            }}
          >
            <riskInfo.icon
              className={`h-6 w-6 ${
                riskInfo.color === "green"
                  ? "text-green-600"
                  : riskInfo.color === "yellow"
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            />
            <div>
              <h4 className="font-semibold text-slate-900">{riskInfo.level} Risk Profile</h4>
              <p className="text-sm text-slate-600">
                {riskInfo.level === "Low"
                  ? "Excellent creditworthiness indicators"
                  : riskInfo.level === "Medium"
                    ? "Moderate risk factors present"
                    : "Several risk factors require attention"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Decision Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getKeyFactors().map((factor, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                <factor.icon
                  className={`h-5 w-5 ${
                    factor.impact === "Positive"
                      ? "text-green-600"
                      : factor.impact === "Negative"
                        ? "text-red-600"
                        : "text-yellow-600"
                  }`}
                />
                <div className="flex-1">
                  <span className="font-medium text-slate-900">{factor.factor}</span>
                </div>
                <Badge variant={factor.impact === "Positive" ? "default" : "secondary"} className="text-xs">
                  {factor.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Next Steps & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                <p className="text-sm text-slate-700">{recommendation}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border">
            <h5 className="font-semibold text-slate-900 mb-2">
              {isApproved ? "Maintain Your Success" : "Improve Your Profile"}
            </h5>
            <p className="text-sm text-slate-600">
              {isApproved
                ? "Keep monitoring your credit health and consider our premium credit monitoring service."
                : "Work on the suggested improvements and reapply in 3-6 months for better results."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{(displayProbability * 100).toFixed(0)}%</div>
              <div className="text-sm text-slate-600">Confidence Score</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-900">{riskInfo.level}</div>
              <div className="text-sm text-slate-600">Risk Level</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg text-center">
            <p className="text-xs text-slate-500">
              This analysis is based on machine learning algorithms trained on thousands of credit applications. Results
              are for informational purposes and may vary from actual lender decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
