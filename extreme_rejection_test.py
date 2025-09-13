import requests

# Extreme rejection case - basically everything that would cause a rejection
extreme_rejection_case = {
    "person_age": 20.0,
    "person_gender": "male",
    "person_education": "High School",
    "person_income": 15000.0,
    "person_emp_exp": 0,
    "person_home_ownership": "RENT",
    "loan_amnt": 40000.0,  # Much higher than income
    "loan_intent": "PERSONAL",
    "loan_int_rate": 25.0,  # Very high interest rate
    "loan_percent_income": 90.0,  # Extremely high debt to income ratio
    "cb_person_cred_hist_length": 0.5,
    "credit_score": 450,  # Very low credit score
    "previous_loan_defaults_on_file": "Yes"  # Previous defaults
}

try:
    print("Sending extreme rejection case to test API...")
    response = requests.post('http://127.0.0.1:8000/predict', json=extreme_rejection_case, timeout=10)
    
    if response.status_code == 200:
        result = response.json()
        print(f"\nRESULT: {result['approvalStatus'].upper()}")
        print(f"Probability: {result['probability']}%")
        print(f"Risk Level: {result['riskLevel']}")
        
        print("\nNegative Factors:")
        for factor in result.get('negativeFactors', []):
            print(f"- {factor}")
        
        print("\nModel Output:")
        print(f"- Raw Prediction: {result['modelOutput']['prediction']}")
        print(f"- Probabilities: {result['modelOutput']['probabilities']}")
    else:
        print(f"Error: HTTP Status {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"Connection error: {e}")