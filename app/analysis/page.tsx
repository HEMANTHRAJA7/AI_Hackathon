"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CheckCircle, XCircle, AlertTriangle, Brain, Zap, TreePine } from "lucide-react"
import Image from "next/image"


interface ModelResult {
  name: string
  icon: React.ReactNode
  accuracy: number
  prediction: "approved" | "rejected" | "manual-review"
  probability: number
  riskLevel: "low" | "medium" | "high"
  confidence: number
  processingTime: number
  truePositives: number
  trueNegatives: number
  falsePositives: number
  falseNegatives: number
  distributionImage: string
  confusionImage: string
}

const mockModelResults: ModelResult[] = [
  {
    name: "Logistic Regression",
    icon: <Brain className="h-5 w-5" />,
    accuracy: 84.2, // Calculated from confusion matrix: (5899+1839)/(5899+1101+161+1839)
    prediction: "approved",
    probability: 78,
    riskLevel: "low",
    confidence: 92,
    processingTime: 12,
    truePositives: 1839,
    trueNegatives: 5899,
    falsePositives: 1101,
    falseNegatives: 161,
    distributionImage: "/images/lr_p.jpeg",
    confusionImage: "/images/lr_c.jpeg",
  },
  {
    name: "XGBoost",
    icon: <Zap className="h-5 w-5" />,
    accuracy: 91.0, // Calculated from confusion matrix: (6371+1836)/(6371+629+164+1836)
    prediction: "approved",
    probability: 85,
    riskLevel: "low",
    confidence: 96,
    processingTime: 28,
    truePositives: 1836,
    trueNegatives: 6371,
    falsePositives: 629,
    falseNegatives: 164,
    distributionImage: "/images/xg_p.jpeg",
    confusionImage: "/images/xg_c.jpeg",
  },
  {
    name: "Random Forest",
    icon: <TreePine className="h-5 w-5" />,
    accuracy: 89.1, // Calculated from confusion matrix: (6248+1803)/(6248+752+197+1803)
    prediction: "approved",
    probability: 82,
    riskLevel: "low",
    confidence: 94,
    processingTime: 45,
    truePositives: 1803,
    trueNegatives: 6248,
    falsePositives: 752,
    falseNegatives: 197,
    distributionImage: "/images/rf_p.jpeg",
    confusionImage: "/images/rf_c.jpeg",
  },
]

const featureImportanceData = [
  { feature: "Total Income", importance: 85, color: "#3b82f6" },
  { feature: "Bad Debt History", importance: 72, color: "#ef4444" },
  { feature: "Years of Work", importance: 58, color: "#10b981" },
  { feature: "Age", importance: 45, color: "#f59e0b" },
  { feature: "Education Level", importance: 38, color: "#8b5cf6" },
  { feature: "Family Status", importance: 25, color: "#06b6d4" },
]

const riskDistributionData = [
  { name: "Low Risk", value: 45, color: "#10b981" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 20, color: "#ef4444" },
]

export default function AnalysisPage() {
  const [selectedModel, setSelectedModel] = useState<ModelResult>(mockModelResults[0])

  const getStatusIcon = (prediction: string) => {
    switch (prediction) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "manual-review":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    }
  }

  const getStatusBadge = (prediction: string) => {
    switch (prediction) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "manual-review":
        return <Badge className="bg-yellow-100 text-yellow-800">Manual Review</Badge>
    }
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-slate-900 mb-4 text-balance">Model Analysis & Comparison</h1>
            <p className="text-lg text-slate-600 text-pretty">
              Compare predictions from Logistic Regression, XGBoost, and Random Forest models with real performance
              metrics.
            </p>
          </div>

          <Tabs defaultValue="comparison" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
              <TabsTrigger value="distributions">Probability Distributions</TabsTrigger>
              <TabsTrigger value="confusion">Confusion Matrices</TabsTrigger>
              <TabsTrigger value="insights">Performance Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Model Cards */}
                <div className="lg:col-span-2 grid gap-4">
                  {mockModelResults.map((model) => (
                    <Card
                      key={model.name}
                      className={`cursor-pointer transition-all ${
                        selectedModel.name === model.name ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedModel(model)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg">{model.icon}</div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{model.name}</h3>
                              <p className="text-sm text-slate-600">Accuracy: {model.accuracy.toFixed(1)}%</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusIcon(model.prediction)}
                            {getStatusBadge(model.prediction)}
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Probability</p>
                            <p className="font-semibold text-slate-900">{model.probability}%</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Risk Level</p>
                            {getRiskBadge(model.riskLevel)}
                          </div>
                          <div>
                            <p className="text-slate-600">Confidence</p>
                            <p className="font-semibold text-slate-900">{model.confidence}%</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Processing</p>
                            <p className="font-semibold text-slate-900">{model.processingTime}ms</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detailed View */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {selectedModel.icon}
                      {selectedModel.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Model Accuracy</span>
                          <span className="text-sm font-semibold">{selectedModel.accuracy.toFixed(1)}%</span>
                        </div>
                        <Progress value={selectedModel.accuracy} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Confidence</span>
                          <span className="text-sm font-semibold">{selectedModel.confidence}%</span>
                        </div>
                        <Progress value={selectedModel.confidence} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Prediction Probability</span>
                          <span className="text-sm font-semibold">{selectedModel.probability}%</span>
                        </div>
                        <Progress value={selectedModel.probability} className="h-2" />
                      </div>
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <h4 className="text-sm font-semibold text-slate-900">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">True Positives:</span>
                          <span className="font-medium">{selectedModel.truePositives}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">True Negatives:</span>
                          <span className="font-medium">{selectedModel.trueNegatives}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">False Positives:</span>
                          <span className="font-medium">{selectedModel.falsePositives}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">False Negatives:</span>
                          <span className="font-medium">{selectedModel.falseNegatives}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Processing Time</span>
                        <span className="text-sm font-medium">{selectedModel.processingTime}ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Model</th>
                          <th className="text-left py-3 px-4">Accuracy</th>
                          <th className="text-left py-3 px-4">True Positives</th>
                          <th className="text-left py-3 px-4">True Negatives</th>
                          <th className="text-left py-3 px-4">False Positives</th>
                          <th className="text-left py-3 px-4">False Negatives</th>
                          <th className="text-left py-3 px-4">Processing Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockModelResults.map((model) => (
                          <tr key={model.name} className="border-b">
                            <td className="py-3 px-4 font-medium">{model.name}</td>
                            <td className="py-3 px-4">{model.accuracy.toFixed(1)}%</td>
                            <td className="py-3 px-4">{model.truePositives}</td>
                            <td className="py-3 px-4">{model.trueNegatives}</td>
                            <td className="py-3 px-4">{model.falsePositives}</td>
                            <td className="py-3 px-4">{model.falseNegatives}</td>
                            <td className="py-3 px-4">{model.processingTime}ms</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distributions" className="space-y-6">
              <div className="grid gap-6">
                {mockModelResults.map((model) => (
                  <Card key={model.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {model.icon}
                        {model.name} - Predicted Probability Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full h-96">
                        <Image
                          src={model.distributionImage || "/placeholder.svg"}
                          alt={'${model.name} probability distribution'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="confusion" className="space-y-6">
              <div className="grid gap-6">
                {mockModelResults.map((model) => (
                  <Card key={model.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {model.icon}
                        {model.name} - Confusion Matrix
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full h-96">
                        <Image
                          src={model.confusionImage || "/placeholder.svg"}
                          alt={'${model.name} confusion matrix'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Model Accuracy Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockModelResults.map((m) => ({ name: m.name, accuracy: m.accuracy }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[80, 95]} />
                        <Tooltip />
                        <Bar dataKey="accuracy" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Best Performer: XGBoost</h4>
                      <p className="text-sm text-green-800">
                        XGBoost achieves the highest accuracy at 91.0% with the lowest false positive rate (629 vs
                        752-1101).
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Balanced Performance: Random Forest</h4>
                      <p className="text-sm text-blue-800">
                        Random Forest shows 89.1% accuracy with good balance between precision and recall.
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Speed vs Accuracy Trade-off</h4>
                      <p className="text-sm text-yellow-800">
                        Logistic Regression is fastest (12ms) but has lower accuracy (84.2%) and higher false positive
                        rate.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Recommendation</h4>
                      <p className="text-sm text-slate-700">
                        Use XGBoost for production deployment due to superior accuracy and balanced error rates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
