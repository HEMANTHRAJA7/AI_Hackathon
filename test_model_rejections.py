import requests
import json

# Test Case 1: Should be rejected - Low credit score, previous defaults, low income
rejection_case1 = {
    "person_age": 22.0,
    "person_gender": "male",
    "person_education": "High School",
    "person_income": 20000.0,
    "person_emp_exp": 0,
    "person_home_ownership": "RENT",
    "loan_amnt": 30000.0,  # loan amount greater than income
    "loan_intent": "PERSONAL",
    "loan_int_rate": 18.5,  # high interest rate
    "loan_percent_income": 80.0,  # high debt to income ratio
    "cb_person_cred_hist_length": 1.0,
    "credit_score": 520,  # low credit score
    "previous_loan_defaults_on_file": "Yes"  # previous defaults
}

# Test Case 2: Borderline case - might get manual review
borderline_case = {
    "person_age": 28.0,
    "person_gender": "female",
    "person_education": "Bachelor",
    "person_income": 45000.0,
    "person_emp_exp": 3,
    "person_home_ownership": "RENT",
    "loan_amnt": 35000.0,
    "loan_intent": "MEDICAL",
    "loan_int_rate": 15.0,
    "loan_percent_income": 45.0,
    "cb_person_cred_hist_length": 4.0,
    "credit_score": 630,
    "previous_loan_defaults_on_file": "No"
}

# Test Case 3: Should be approved - Good credentials
approval_case = {
    "person_age": 40.0,
    "person_gender": "male",
    "person_education": "Master",
    "person_income": 120000.0,
    "person_emp_exp": 12,
    "person_home_ownership": "OWN",
    "loan_amnt": 25000.0,
    "loan_intent": "HOMEIMPROVEMENT",
    "loan_int_rate": 9.5,
    "loan_percent_income": 15.0,
    "cb_person_cred_hist_length": 10.0,
    "credit_score": 780,
    "previous_loan_defaults_on_file": "No"
}

test_cases = [
    {"name": "CASE 1 - SHOULD BE REJECTED", "data": rejection_case1},
    {"name": "CASE 2 - BORDERLINE CASE", "data": borderline_case},
    {"name": "CASE 3 - SHOULD BE APPROVED", "data": approval_case}
]

# Function to send and display a prediction
def test_prediction(case):
    print(f"\n\n===== {case['name']} =====")
    print(f"Sending request to Flask API...")
    
    try:
        response = requests.post('http://localhost:8000/predict', 
                            json=case['data'], 
                            timeout=10)
        
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"\nRESULT: {result['approvalStatus'].upper()}")
            print(f"Probability: {result['probability']}%")
            print(f"Risk Level: {result['riskLevel']}")
            
            if result['creditLimit'] > 0:
                print(f"Credit Limit: ${result['creditLimit']}")
            
            if result['positiveFactors']:
                print("\nPositive Factors:")
                for factor in result['positiveFactors']:
                    print(f"- {factor}")
                    
            if result['negativeFactors']:
                print("\nNegative Factors:")
                for factor in result['negativeFactors']:
                    print(f"- {factor}")
            
            print("\nModel Output:")
            print(f"- Raw Prediction: {result['modelOutput']['prediction']}")
            print(f"- Probabilities: {result['modelOutput']['probabilities']}")
        else:
            print(f"Error response: {response.text}")
        
    except Exception as e:
        print(f"Error: {e}")

# Test all cases
for case in test_cases:
    test_prediction(case)