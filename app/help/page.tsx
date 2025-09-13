import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Briefcase, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react"
import { Footer } from "@/components/footer"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-slate-900 mb-4 text-balance">Help & Documentation</h1>
            <p className="text-lg text-slate-600 text-pretty">
              Learn about input parameters, model outputs, and how our prediction system works.
            </p>
          </div>

          <Tabs defaultValue="inputs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inputs">Input Parameters</TabsTrigger>
              <TabsTrigger value="outputs">Output Criteria</TabsTrigger>
              <TabsTrigger value="models">ML Models</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Person Age</h4>
                      <p className="text-slate-600">
                        Numeric input for applicant's age in years. Affects risk assessment and credit limit
                        calculations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Person Gender</h4>
                      <p className="text-slate-600">Dropdown selection: Female, Male.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Person Education</h4>
                      <p className="text-slate-600">
                        Dropdown selection for highest education level: High School, Bachelor, Associate, Master,
                        Doctorate.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Person Home Ownership</h4>
                      <p className="text-slate-600">
                        Dropdown selection: RENT, OWN, MORTGAGE, OTHER. Property ownership status affects
                        creditworthiness assessment.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Financial Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Person Income</h4>
                      <p className="text-slate-600">
                        Numeric input for applicant's annual income. Higher income generally increases approval chances.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Person Employment Experience</h4>
                      <p className="text-slate-600">
                        Numeric input for years of employment experience. Longer work history indicates stability.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Credit Score</h4>
                      <p className="text-slate-600">
                        Numeric input (390-850 range). Credit score that significantly impacts approval decisions.
                        Higher scores indicate better creditworthiness.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Credit History Length</h4>
                      <p className="text-slate-600">
                        Numeric input for credit history length in years. Longer credit history generally improves
                        approval chances.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Previous Loan Defaults</h4>
                      <p className="text-slate-600">
                        Dropdown selection: Yes, No. History of loan defaults significantly impacts approval decisions.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      Loan Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Loan Amount</h4>
                      <p className="text-slate-600">
                        Numeric input for loan amount requested. Higher amounts may require stricter approval criteria.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Loan Intent</h4>
                      <p className="text-slate-600">
                        Dropdown selection for loan purpose: PERSONAL, EDUCATION, MEDICAL, VENTURE, HOMEIMPROVEMENT,
                        DEBTCONSOLIDATION.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Loan Interest Rate</h4>
                      <p className="text-slate-600">
                        Numeric input for loan interest rate percentage. Higher rates may indicate higher risk.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Loan Percent Income</h4>
                      <p className="text-slate-600">
                        Numeric input for ratio or percentage of income allocated for loan. Lower ratios are generally
                        preferred.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="outputs" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Approval Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      <span className="text-slate-600">Application meets all criteria for credit card approval</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                      <span className="text-slate-600">Application does not meet minimum requirements</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-100 text-yellow-800">Manual Review</Badge>
                      <span className="text-slate-600">Requires human evaluation for final decision</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
                      <span className="text-slate-600">Probability of default &lt; 20%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      <span className="text-slate-600">Probability of default 20% - 50%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      <span className="text-slate-600">Probability of default &gt; 50%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Additional Outputs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Approval Probability</h4>
                      <p className="text-slate-600">
                        Percentage likelihood of approval based on model predictions (0-100%).
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Recommended Credit Limit</h4>
                      <p className="text-slate-600">
                        Suggested credit limit based on income, risk assessment, and financial profile.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Decision Factors</h4>
                      <p className="text-slate-600">
                        Key positive and negative factors that influenced the prediction outcome.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="models" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Logistic Regression</CardTitle>
                    <CardDescription>Linear probabilistic model for binary classification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Uses linear relationships between input features to predict approval probability. Provides
                      interpretable coefficients showing the impact of each factor.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Accuracy</span>
                        <span className="text-sm text-slate-600">84.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Speed</span>
                        <span className="text-sm text-slate-600">Very Fast</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Interpretability</span>
                        <span className="text-sm text-slate-600">High</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>XGBoost</CardTitle>
                    <CardDescription>Gradient boosting ensemble method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Advanced gradient boosting algorithm that combines multiple weak learners to create a strong
                      predictor. Excellent performance with structured data and handles missing values well.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Accuracy</span>
                        <span className="text-sm text-slate-600">91.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Speed</span>
                        <span className="text-sm text-slate-600">Fast</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Interpretability</span>
                        <span className="text-sm text-slate-600">Moderate</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Random Forest</CardTitle>
                    <CardDescription>Ensemble of multiple decision trees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Combines predictions from multiple decision trees to improve accuracy and reduce overfitting.
                      Provides feature importance rankings.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Accuracy</span>
                        <span className="text-sm text-slate-600">89.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Speed</span>
                        <span className="text-sm text-slate-600">Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Interpretability</span>
                        <span className="text-sm text-slate-600">Moderate</span>
                      </div>
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
