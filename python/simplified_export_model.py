import pandas as pd
import pickle
import os
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.datasets import make_classification

def train_and_save_svm_model():
    print("Generating synthetic dataset...")
    # Generate a synthetic dataset similar to credit card approval data
    X, y = make_classification(n_samples=1000, n_features=12, n_informative=8, 
                              n_redundant=2, random_state=42)
    
    # Convert to DataFrame with appropriate column names
    feature_names = [
        "person_age", "person_income", "person_emp_exp", "credit_score",
        "cb_person_cred_hist_length", "loan_amnt", "loan_int_rate", 
        "loan_percent_income", "feature9", "feature10", "feature11", "feature12"
    ]
    X_df = pd.DataFrame(X, columns=feature_names)
    
    # Add categorical features
    X_df["person_gender"] = np.random.choice(["male", "female"], size=1000)
    X_df["person_education"] = np.random.choice(
        ["High School", "Bachelor", "Master", "Doctorate"], size=1000
    )
    X_df["person_home_ownership"] = np.random.choice(
        ["RENT", "OWN", "MORTGAGE", "OTHER"], size=1000
    )
    X_df["loan_intent"] = np.random.choice(
        ["EDUCATION", "PERSONAL", "MEDICAL", "VENTURE", "HOMEIMPROVEMENT", "DEBTCONSOLIDATION"], 
        size=1000
    )
    X_df["previous_loan_defaults_on_file"] = np.random.choice(
        ["Yes", "No"], size=1000, p=[0.2, 0.8]  # 20% yes, 80% no
    )
    
    print("Preprocessing data...")
    # Handle categorical variables with one-hot encoding
    X_encoded = pd.get_dummies(X_df, drop_first=True)
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X_encoded, y, test_size=0.2, random_state=42
    )
    
    print("Training SVM model...")
    # Create pipeline with scaling + SVM
    svm_model = Pipeline([
        ("scaler", StandardScaler()),
        ("svm", SVC(kernel="rbf", probability=True, random_state=42))
    ])
    
    # Fit model
    svm_model.fit(X_train, y_train)
    
    print("Evaluating model...")
    from sklearn.metrics import accuracy_score
    # Evaluate model
    y_pred = svm_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model accuracy: {accuracy:.4f}")
    
    print("Saving model and feature information...")
    # Save the model
    model_dir = "ml_model"
    os.makedirs(model_dir, exist_ok=True)
    
    # Save the model to a pickle file
    with open(os.path.join(model_dir, "svm_model.pkl"), "wb") as f:
        pickle.dump(svm_model, f)
    
    # Save feature names for preprocessing
    with open(os.path.join(model_dir, "feature_names.pkl"), "wb") as f:
        pickle.dump(list(X_encoded.columns), f)
        
    # Save a sample for testing
    sample = X_encoded.iloc[0:1].copy()
    with open(os.path.join(model_dir, "sample_input.pkl"), "wb") as f:
        pickle.dump(sample, f)
    
    print(f"Model saved to {os.path.abspath(model_dir)}/svm_model.pkl")
    print(f"Feature names saved to {os.path.abspath(model_dir)}/feature_names.pkl")
    
    return svm_model, list(X_encoded.columns)

if __name__ == "__main__":
    train_and_save_svm_model()