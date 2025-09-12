import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, CreditCard, BarChart3 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CreditCard className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900 text-balance">Credit Card Approval Prediction</h1>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              Advanced machine learning models to predict credit card approval decisions. Get instant risk assessments
              and approval probabilities using multiple AI algorithms.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Smart Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  AI-powered analysis using multiple machine learning models for accurate predictions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="text-lg">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Comprehensive risk evaluation with detailed probability scores and recommendations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-slate-600" />
                </div>
                <CardTitle className="text-lg">Model Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Compare results from Logistic Regression, Decision Tree, and Random Forest models
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prediction">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all hover:scale-105 animate-pulse-glow"
              >
                Start Prediction
              </Button>
            </Link>
            <Link href="/help">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all hover:scale-105"
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
