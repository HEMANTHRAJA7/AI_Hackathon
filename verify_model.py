import pandas as pd
import numpy as np
import pickle
import os
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC

def verify_model_rejections():
    print("Loading the SVM model to directly test rejection cases...")
    
    # Load the model
    model_dir = os.path.join("python", "ml_model")
    
    # Load the model from the pickle file
    with open(os.path.join(model_dir, "svm_model.pkl"), "rb") as f:
        model = pickle.load(f)
    
    # Load feature names
    with open(os.path.join(model_dir, "feature_names.pkl"), "rb") as f:
        feature_names = pickle.load(f)
    
    # Create extreme test cases
    test_cases = [
        {
            "name": "High Risk Rejection Case",
            "data": {
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
        },
        {
            "name": "Medium Risk Case",
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
                "loan_percent_income": 45.0,
                "cb_person_cred_hist_length": 4.0,
                "credit_score": 630,
                "previous_loan_defaults_on_file": "No"
            }
        },
        {
            "name": "Low Risk Approval Case",
            "data": {
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
        }
    ]
    
    # Process each test case
    for case in test_cases:
        print(f"\n===== Testing: {case['name']} =====")
        
        # Create a single row DataFrame
        df = pd.DataFrame([case['data']])
        
        # Apply one-hot encoding
        df_encoded = pd.get_dummies(df, drop_first=True)
        
        # Make sure all columns in the training data are present
        for col in feature_names:
            if col not in df_encoded.columns:
                df_encoded[col] = 0
        
        # Ensure we only have the columns in the training data
        df_encoded = df_encoded[feature_names]
        
        # Make prediction
        prediction = model.predict(df_encoded)[0]
        probabilities = model.predict_proba(df_encoded)[0]
        
        # Format output
        if prediction == 1:
            approval = "APPROVED"
        else:
            approval = "REJECTED"
            
        print(f"Prediction: {approval}")
        print(f"Raw prediction value: {prediction}")
        print(f"Probability of rejection: {probabilities[0]:.2f}")
        print(f"Probability of approval: {probabilities[1]:.2f}")
        
        # Additional risk factors
        if case['data']['previous_loan_defaults_on_file'] == "Yes":
            print("- Previous loan defaults on file")
            
        if case['data']['credit_score'] < 600:
            print("- Low credit score:", case['data']['credit_score'])
            
        if case['data']['person_income'] < case['data']['loan_amnt']:
            print("- Income lower than loan amount")
            
        if case['data']['loan_percent_income'] > 50:
            print("- High loan to income percentage")

if __name__ == "__main__":
    verify_model_rejections()