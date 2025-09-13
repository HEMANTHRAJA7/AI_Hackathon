import requests
import json

# Define test cases
test_cases = [
    {
        "name": "HIGH RISK - Should be REJECTED",
        "data": {
            "person_age": 20.0,
            "person_gender": "male",
            "person_education": "High School",
            "person_income": 15000.0,
            "person_emp_exp": 0,
            "person_home_ownership": "RENT",
            "loan_amnt": 40000.0,  # loan amount > income
            "loan_intent": "PERSONAL",
            "loan_int_rate": 25.0,  # high interest rate
            "loan_percent_income": 90.0,  # very high debt-to-income
            "cb_person_cred_hist_length": 0.5,
            "credit_score": 450,  # very low credit score
            "previous_loan_defaults_on_file": "Yes"  # has defaults
        }
    },
    {
        "name": "MEDIUM RISK - Should get MANUAL REVIEW",
        "data": {
            "person_age": 28.0,
            "person_gender": "female",
            "person_education": "Bachelor",
            "person_income": 45000.0,
            "person_emp_exp": 3,
            "person_home_ownership": "RENT",
            "loan_amnt": 35000.0,
            "loan_intent": "MEDICAL",
            "loan_int_rate": 15.0,
            "loan_percent_income": 45.0,  # high debt-to-income
            "cb_person_cred_hist_length": 4.0,
            "credit_score": 630,  # fair credit score
            "previous_loan_defaults_on_file": "No"
        }
    },
    {
        "name": "LOW RISK - Should be APPROVED",
        "data": {
            "person_age": 40.0,
            "person_gender": "male",
            "person_education": "Master",
            "person_income": 120000.0,
            "person_emp_exp": 12,  # good experience
            "person_home_ownership": "OWN",
            "loan_amnt": 25000.0,  # good income to loan ratio
            "loan_intent": "HOMEIMPROVEMENT",
            "loan_int_rate": 9.5,  # good rate
            "loan_percent_income": 15.0,  # low debt-to-income
            "cb_person_cred_hist_length": 10.0,  # established history
            "credit_score": 780,  # excellent credit
            "previous_loan_defaults_on_file": "No"  # no defaults
        }
    }
]

print("Testing all three scenarios: rejection, manual review, and approval\n")

for case in test_cases:
    print(f"\n===== {case['name']} =====")
    print("Sending request to Flask API...")
    
    try:
        response = requests.post('http://localhost:8000/predict', 
                              json=case['data'], 
                              timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            
            # Print main result with styling
            status = result['approvalStatus'].upper()
            print(f"\nDECISION: {status}")
            print(f"Probability: {result['probability']}%")
            print(f"Risk Level: {result['riskLevel'].upper()}")
            
            if result['creditLimit'] > 0:
                print(f"Credit Limit: ${result['creditLimit']:,}")
            
            # Print factors
            if result['positiveFactors']:
                print("\nPositive Factors:")
                for factor in result['positiveFactors']:
                    if factor:  # Skip empty strings
                        print(f"+ {factor}")
            
            if result['negativeFactors']:
                print("\nNegative Factors:")
                for factor in result['negativeFactors']:
                    if factor:  # Skip empty strings
                        print(f"- {factor}")
            
            # Print raw model output
            print("\nModel Details:")
            print(f"Raw prediction: {result['modelOutput']['prediction']}")
            print(f"Probability distribution: {[round(p*100) for p in result['modelOutput']['probabilities']]}%")
            
        else:
            print(f"Error response: {response.status_code}")
            print(response.text)
        
    except Exception as e:
        print(f"Error: {e}")
        
    print("\n" + "-"*50)