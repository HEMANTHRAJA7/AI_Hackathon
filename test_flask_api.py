import requests
import json

# Test data matching the example in the API
test_data = {
    "person_age": 35.0,
    "person_gender": "male",
    "person_education": "Bachelor",
    "person_income": 75000.0,
    "person_emp_exp": 8,
    "person_home_ownership": "OWN",
    "loan_amnt": 20000.0,
    "loan_intent": "EDUCATION",
    "loan_int_rate": 10.5,
    "loan_percent_income": 25.0,
    "cb_person_cred_hist_length": 7.0,
    "credit_score": 720,
    "previous_loan_defaults_on_file": "No"
}

print("Sending request to Flask API...")
try:
    response = requests.post('http://localhost:8000/predict', 
                          json=test_data, 
                          timeout=10)
    
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"\nAPI Response: {json.dumps(result, indent=2)}")
    else:
        print(f"Error response: {response.text}")
    
except Exception as e:
    print(f"Error: {e}")