"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { CheckCircle, XCircle, AlertTriangle, Brain, TreePine, Network } from "lucide-react"

interface ModelResult {
  name: string
  icon: React.ReactNode
  accuracy: number
  prediction: "approved" | "rejected" | "manual-review"
  probability: number
  riskLevel: "low" | "medium" | "high"
  confidence: number
  processingTime: number
}

const mockModelResults: ModelResult[] = [
  {
    name: "Logistic Regression",
    icon: <Brain className="h-5 w-5" />,
    accuracy: 85,
    prediction: "approved",
    probability: 78,
    riskLevel: "low",
    confidence: 92,
    processingTime: 12,
  },
  {
    name: "Decision Tree",
    icon: <TreePine className="h-5 w-5" />,
    accuracy: 82,
    prediction: "manual-review",
    probability: 65,
    riskLevel: "medium",
    confidence: 88,
    processingTime: 8,
  },
  {
    name: "Random Forest",
    icon: <Network className="h-5 w-5" />,
    accuracy: 88,
    prediction: "approved",
    probability: 82,
    riskLevel: "low",
    confidence: 95,
    processingTime: 45,
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
              Compare predictions from different machine learning models and analyze feature importance.
            </p>
          </div>

          <Tabs defaultValue="comparison" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
              <TabsTrigger value="features">Feature Analysis</TabsTrigger>
              <TabsTrigger value="insights">Risk Insights</TabsTrigger>
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
                              <p className="text-sm text-slate-600">Accuracy: {model.accuracy}%</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusIcon(model.prediction)}
                            {getStatusBadge(model.prediction)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
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
                          <span className="text-sm font-medium">Probability</span>
                          <span className="text-sm font-semibold">{selectedModel.probability}%</span>
                        </div>
                        <Progress value={selectedModel.probability} className="h-2" />
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
                          <span className="text-sm font-medium">Model Accuracy</span>
                          <span className="text-sm font-semibold">{selectedModel.accuracy}%</span>
                        </div>
                        <Progress value={selectedModel.accuracy} className="h-2" />
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
                  <CardTitle>Model Comparison Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Model</th>
                          <th className="text-left py-3 px-4">Prediction</th>
                          <th className="text-left py-3 px-4">Probability</th>
                          <th className="text-left py-3 px-4">Risk Level</th>
                          <th className="text-left py-3 px-4">Confidence</th>
                          <th className="text-left py-3 px-4">Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockModelResults.map((model) => (
                          <tr key={model.name} className="border-b">
                            <td className="py-3 px-4 font-medium">{model.name}</td>
                            <td className="py-3 px-4">{getStatusBadge(model.prediction)}</td>
                            <td className="py-3 px-4">{model.probability}%</td>
                            <td className="py-3 px-4">{getRiskBadge(model.riskLevel)}</td>
                            <td className="py-3 px-4">{model.confidence}%</td>
                            <td className="py-3 px-4">{model.accuracy}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Importance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={featureImportanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="feature" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="importance" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feature Impact Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featureImportanceData.map((feature) => (
                        <div key={feature.feature} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{feature.feature}</span>
                            <span className="text-sm text-slate-600">{feature.importance}%</span>
                          </div>
                          <Progress value={feature.importance} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Model Consensus</h4>
                      <p className="text-sm text-blue-800">
                        2 out of 3 models recommend approval, indicating strong likelihood of creditworthiness.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Strongest Factors</h4>
                      <p className="text-sm text-green-800">
                        High income and clean credit history are the primary drivers for approval recommendation.
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Areas to Monitor</h4>
                      <p className="text-sm text-yellow-800">
                        Decision Tree model suggests manual review due to moderate work experience factor.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">Recommendation</h4>
                      <p className="text-sm text-slate-700">
                        Based on ensemble analysis, approve with standard monitoring protocols.
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
