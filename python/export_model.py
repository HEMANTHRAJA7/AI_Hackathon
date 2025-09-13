import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from datasets import load_dataset

def train_and_save_svm_model():
    print("Loading dataset from Hugging Face...")
    # Load dataset
    ds = load_dataset("thomask1018/credit_card_approval")
    df = ds["train"].to_pandas()
    
    print("Preprocessing data...")
    # Preprocess data
    target = "loan_status"
    X = df.drop(columns=[target])
    y = df[target]
    
    # Handle categorical variables with one-hot encoding
    X = pd.get_dummies(X, drop_first=True)
    
    # Handle missing values
    X = X.fillna(0)
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
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
        pickle.dump(list(X.columns), f)
        
    # Save a sample for testing
    sample = X.iloc[0:1].copy()
    with open(os.path.join(model_dir, "sample_input.pkl"), "wb") as f:
        pickle.dump(sample, f)
    
    print(f"Model saved to {os.path.abspath(model_dir)}/svm_model.pkl")
    print(f"Feature names saved to {os.path.abspath(model_dir)}/feature_names.pkl")
    
    return svm_model, list(X.columns)

if __name__ == "__main__":
    train_and_save_svm_model()