import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import numpy as np

def train_and_save_svm_model():
    print("Creating dataset with structure matching the original notebook...")
    
    # Create a sample dataset with structure matching the original credit card approval dataset
    # This is based on the features in your notebook
    
    # Generate synthetic data with proper distributions
    n_samples = 1000
    np.random.seed(42)
    
    # Create base dataframe with numerical features
    data = {
        'person_age': np.random.normal(35, 12, n_samples).clip(18, 80).round(),
        'person_income': np.random.lognormal(10.5, 0.6, n_samples).round(),
        'person_emp_exp': np.random.normal(5, 4, n_samples).clip(0, 30).round(),
        'loan_amnt': np.random.lognormal(9.5, 0.8, n_samples).round(),
        'loan_int_rate': (np.random.normal(12, 3, n_samples).clip(5, 25) * 10).round() / 10,
        'loan_percent_income': (np.random.normal(0.2, 0.1, n_samples).clip(0.01, 0.5) * 100).round() / 100,
        'cb_person_cred_hist_length': np.random.normal(8, 6, n_samples).clip(0, 30).round(),
        'credit_score': np.random.normal(680, 80, n_samples).clip(300, 850).round()
    }
    
    df = pd.DataFrame(data)
    
    # Add categorical variables
    df['person_gender'] = np.random.choice(['male', 'female'], size=n_samples, p=[0.52, 0.48])
    df['person_education'] = np.random.choice(
        ['High School', 'Bachelor', 'Associate', 'Master', 'Doctorate'], 
        size=n_samples, 
        p=[0.3, 0.4, 0.15, 0.1, 0.05]
    )
    df['person_home_ownership'] = np.random.choice(
        ['RENT', 'OWN', 'MORTGAGE', 'OTHER'], 
        size=n_samples, 
        p=[0.4, 0.2, 0.35, 0.05]
    )
    df['loan_intent'] = np.random.choice(
        ['EDUCATION', 'PERSONAL', 'MEDICAL', 'VENTURE', 'HOMEIMPROVEMENT', 'DEBTCONSOLIDATION'], 
        size=n_samples, 
        p=[0.15, 0.3, 0.15, 0.1, 0.2, 0.1]
    )
    df['previous_loan_defaults_on_file'] = np.random.choice(['Yes', 'No'], size=n_samples, p=[0.2, 0.8])
    
    # Generate target variable with realistic dependencies on features
    # Higher probability of approval for higher income, better credit score, etc.
    prob_approval = 0.5 + 0.2 * (df['credit_score'] > 700) \
                  - 0.3 * (df['previous_loan_defaults_on_file'] == 'Yes') \
                  + 0.2 * (df['person_income'] > 75000) \
                  - 0.1 * (df['loan_percent_income'] > 0.3) \
                  + 0.1 * (df['person_education'].isin(['Bachelor', 'Master', 'Doctorate']))
    
    # Clip probabilities to [0.1, 0.9] range to maintain some randomness
    prob_approval = prob_approval.clip(0.1, 0.9)
    
    # Generate target (1=approved, 0=rejected)
    df['loan_status'] = np.random.binomial(1, prob_approval)
    
    print("Dataset created with shape:", df.shape)
    print("Approval rate:", df['loan_status'].mean())
    
    # Print sample of the data
    print("\nSample data:")
    print(df.head())
    
    print("\nPreprocessing data...")
    # Separate features and target
    target = "loan_status"
    X = df.drop(columns=[target])
    y = df[target]
    
    # Handle categorical variables with one-hot encoding
    X = pd.get_dummies(X, drop_first=True)
    
    # Handle missing values (if any)
    X = X.fillna(0)
    
    # Print shape after preprocessing
    print("Features shape after preprocessing:", X.shape)
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print("\nTraining SVM model...")
    # Create pipeline with scaling + SVM - exactly as in the notebook
    svm_model = Pipeline([
        ("scaler", StandardScaler()),
        ("svm", SVC(kernel="rbf", probability=True, random_state=42))
    ])
    
    # Fit model
    svm_model.fit(X_train, y_train)
    
    print("\nEvaluating model...")
    # Evaluate model
    y_pred = svm_model.predict(X_test)
    
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
    print("\nClassification Report:\n", classification_report(y_test, y_pred))
    
    print("\nSaving model and feature information...")
    # Save the model
    model_dir = "ml_model"
    os.makedirs(model_dir, exist_ok=True)
    
    # Save the model to a pickle file
    with open(os.path.join(model_dir, "svm_model.pkl"), "wb") as f:
        pickle.dump(svm_model, f)
    
    # Save feature names for preprocessing
    with open(os.path.join(model_dir, "feature_names.pkl"), "wb") as f:
        pickle.dump(list(X.columns), f)
    
    # Save column information for input processing
    column_info = {
        "categorical_columns": [
            "person_gender", "person_education", "person_home_ownership", 
            "loan_intent", "previous_loan_defaults_on_file"
        ],
        "numeric_columns": [
            "person_age", "person_income", "person_emp_exp", "loan_amnt", 
            "loan_int_rate", "loan_percent_income", "cb_person_cred_hist_length", 
            "credit_score"
        ]
    }
    with open(os.path.join(model_dir, "column_info.pkl"), "wb") as f:
        pickle.dump(column_info, f)
        
    # Save a sample for testing
    sample = X.iloc[0:1].copy()
    with open(os.path.join(model_dir, "sample_input.pkl"), "wb") as f:
        pickle.dump(sample, f)
    
    print(f"Model saved to {os.path.abspath(model_dir)}/svm_model.pkl")
    print(f"Feature names saved to {os.path.abspath(model_dir)}/feature_names.pkl")
    
    return svm_model, list(X.columns)

if __name__ == "__main__":
    train_and_save_svm_model()