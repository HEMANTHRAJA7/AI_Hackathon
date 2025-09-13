import requests
import json

# Test data matching the example in the API
test_data = {
    "person_age": 28.0,
    "person_gender": "male",
    "person_education": "Bachelor",
    "person_income": 50000.0,
    "person_emp_exp": 3,
    "person_home_ownership": "RENT",
    "loan_amnt": 15000.0,
    "loan_intent": "EDUCATION",
    "loan_int_rate": 12.5,
    "loan_percent_income": 30.0,
    "cb_person_cred_hist_length": 5.0,
    "credit_score": 700,
    "previous_loan_defaults_on_file": "No"
}

print("Sending request to Flask API...")
try:
    # Try health endpoint first
    health_response = requests.get('http://localhost:8000/health', timeout=5)
    print(f"Health check status: {health_response.status_code}")
    print(f"Health response: {health_response.text}")
    
    # Then try prediction
    response = requests.post('http://localhost:8000/predict', 
                           json=test_data, 
                           timeout=10)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response:\n{json.dumps(response.json(), indent=2)}")
    
except Exception as e:
    print(f"Error: {e}")