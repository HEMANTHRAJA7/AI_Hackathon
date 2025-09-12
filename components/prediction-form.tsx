"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Loader2 } from "lucide-react"
import type { PredictionData } from "../src/App"

interface PredictionFormProps {
  onSubmit: (data: PredictionData) => void
  isLoading: boolean
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictionData>({
    person_age: 0,
    person_gender: "",
    person_education: "",
    person_income: 0,
    person_emp_exp: 0,
    person_home_ownership: "",
    loan_amnt: 0,
    loan_intent: "",
    loan_int_rate: 0,
    loan_percent_income: 0,
    cb_person_cred_hist_length: 0,
    credit_score: 0,
    previous_loan_defaults_on_file: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updateField = (field: keyof PredictionData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Loan Application Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="person_age">Age</Label>
                <Input
                  id="person_age"
                  type="number"
                  placeholder="e.g., 35"
                  value={formData.person_age || ""}
                  onChange={(e) => updateField("person_age", Number(e.target.value))}
                  required
                />
                <p className="text-sm text-slate-500">Age in years</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="person_gender">Gender</Label>
                <Select value={formData.person_gender} onValueChange={(value) => updateField("person_gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="person_education">Education Level</Label>
              <Select
                value={formData.person_education}
                onValueChange={(value) => updateField("person_education", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                  <SelectItem value="Doctorate">Doctorate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="person_home_ownership">Home Ownership</Label>
              <Select
                value={formData.person_home_ownership}
                onValueChange={(value) => updateField("person_home_ownership", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select home ownership status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RENT">RENT</SelectItem>
                  <SelectItem value="OWN">OWN</SelectItem>
                  <SelectItem value="MORTGAGE">MORTGAGE</SelectItem>
                  <SelectItem value="OTHER">OTHER</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Financial Information</h3>

            <div className="space-y-2">
              <Label htmlFor="person_income">Annual Income</Label>
              <Input
                id="person_income"
                type="number"
                placeholder="e.g., 75000"
                value={formData.person_income || ""}
                onChange={(e) => updateField("person_income", Number(e.target.value))}
                required
              />
              <p className="text-sm text-slate-500">Enter your annual income</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="person_emp_exp">Employment Experience</Label>
              <Input
                id="person_emp_exp"
                type="number"
                placeholder="e.g., 8"
                value={formData.person_emp_exp || ""}
                onChange={(e) => updateField("person_emp_exp", Number(e.target.value))}
                required
              />
              <p className="text-sm text-slate-500">Years of employment experience</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credit_score">Credit Score</Label>
              <Input
                id="credit_score"
                type="number"
                placeholder="e.g., 750"
                min="390"
                max="850"
                value={formData.credit_score || ""}
                onChange={(e) => updateField("credit_score", Number(e.target.value))}
                required
              />
              <p className="text-sm text-slate-500">Enter your credit score (390-850 range)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cb_person_cred_hist_length">Credit History Length</Label>
              <Input
                id="cb_person_cred_hist_length"
                type="number"
                placeholder="e.g., 12"
                value={formData.cb_person_cred_hist_length || ""}
                onChange={(e) => updateField("cb_person_cred_hist_length", Number(e.target.value))}
                required
              />
              <p className="text-sm text-slate-500">Credit history length in years</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previous_loan_defaults_on_file">Previous Loan Defaults</Label>
              <Select
                value={formData.previous_loan_defaults_on_file}
                onValueChange={(value) => updateField("previous_loan_defaults_on_file", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select loan default history" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Loan Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Loan Information</h3>

            <div className="space-y-2">
              <Label htmlFor="loan_amnt">Loan Amount</Label>
              <Input
                id="loan_amnt"
                type="number"
                placeholder="e.g., 25000"
                value={formData.loan_amnt || ""}
                onChange={(e) => updateField("loan_amnt", Number(e.target.value))}
                required
              />
              <p className="text-sm text-slate-500">Loan amount requested</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan_intent">Loan Purpose</Label>
              <Select value={formData.loan_intent} onValueChange={(value) => updateField("loan_intent", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERSONAL">PERSONAL</SelectItem>
                  <SelectItem value="EDUCATION">EDUCATION</SelectItem>
                  <SelectItem value="MEDICAL">MEDICAL</SelectItem>
                  <SelectItem value="VENTURE">VENTURE</SelectItem>
                  <SelectItem value="HOMEIMPROVEMENT">HOMEIMPROVEMENT</SelectItem>
                  <SelectItem value="DEBTCONSOLIDATION">DEBTCONSOLIDATION</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loan_int_rate">Interest Rate</Label>
                <Input
                  id="loan_int_rate"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 12.5"
                  value={formData.loan_int_rate || ""}
                  onChange={(e) => updateField("loan_int_rate", Number(e.target.value))}
                  required
                />
                <p className="text-sm text-slate-500">Loan interest rate %</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan_percent_income">Loan % of Income</Label>
                <Input
                  id="loan_percent_income"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 25.5"
                  value={formData.loan_percent_income || ""}
                  onChange={(e) => updateField("loan_percent_income", Number(e.target.value))}
                  required
                />
                <p className="text-sm text-slate-500">% of income allocated for loan</p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get Prediction"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
