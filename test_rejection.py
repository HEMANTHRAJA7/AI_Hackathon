import requests

print("Testing high risk rejection case...")
data = {
    "person_age": 20.0,
    "person_gender": "male",
    "person_education": "High School",
    "person_income": 15000.0,
    "person_emp_exp": 0,
    "person_home_ownership": "RENT",
    "loan_amnt": 40000.0,
    "loan_intent": "PERSONAL",
    "loan_int_rate": 25.0,
    "loan_percent_income": 90.0,
    "cb_person_cred_hist_length": 0.5,
    "credit_score": 450,
    "previous_loan_defaults_on_file": "Yes"
}

try:
    response = requests.post('http://localhost:8000/predict', json=data)
    result = response.json()
    print(f"RESULT: {result['approvalStatus'].upper()}")
    print(f"Risk Level: {result['riskLevel']}")
    print(f"Probability: {result['probability']}%")
except Exception as e:
    print(f"Error: {e}")