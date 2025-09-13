# SVM Model for Credit Card Approval Prediction

This directory contains Python scripts to train and serve the SVM model for credit card approval prediction.

## Setup Instructions

### 1. Install Python Dependencies

Create a Python virtual environment and install the required packages:

```bash
# Navigate to the Python directory
cd python

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Upgrade pip to the latest version
python -m pip install --upgrade pip

# Install wheel (needed for Windows)
pip install wheel

# Install required packages
pip install -r requirements.txt
```

If you encounter issues installing pandas on Windows, you can try these alternative approaches:

**Option 1**: Install a pre-built wheel:
```bash
pip install --only-binary :all: pandas
```

**Option 2**: Use conda instead of pip:
```bash
# Install miniconda from https://docs.conda.io/en/latest/miniconda.html
conda create -n credit-card-svm python=3.9
conda activate credit-card-svm
conda install flask pandas numpy scikit-learn
pip install datasets
```

### 2. Train and Export the SVM Model

Run the export script to train and save the SVM model:

```bash
python export_model.py
```

This will:
- Download the credit card approval dataset
- Preprocess the data
- Train an SVM model
- Save the model to the `ml_model` directory

### 3. Start the Flask API Server

Run the API server to serve predictions:

```bash
python api_server.py
```

The API server will start on http://localhost:5000 and expose the following endpoints:
- `POST /predict`: Takes input data and returns a prediction
- `GET /health`: Health check endpoint

### 4. Configure Your Next.js App

Set the ML server URL in your environment by either:

- Adding it to your `.env.local` file:
  ```
  ML_SERVER_URL=http://localhost:5000
  ```
  
- Or setting it directly when starting your Next.js app:
  ```bash
  # On Windows PowerShell:
  $env:ML_SERVER_URL="http://localhost:5000"; npm run dev
  
  # On Windows Command Prompt:
  set ML_SERVER_URL=http://localhost:5000 && npm run dev
  
  # On macOS/Linux:
  ML_SERVER_URL=http://localhost:5000 npm run dev
  ```

## API Usage

### Prediction Endpoint

Send a POST request to `/predict` with the following JSON body:

```json
{
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
```

### Response Format

```json
{
  "approvalStatus": "approved",
  "probability": 75,
  "riskLevel": "low",
  "creditLimit": 15000,
  "positiveFactors": [
    "Good credit score",
    "No history of defaults",
    "Stable employment history"
  ],
  "negativeFactors": [],
  "modelOutput": {
    "prediction": 1,
    "probabilities": [0.25, 0.75]
  }
}
```

## Troubleshooting

### Model Not Found

If you get an error about the model not being found, ensure:
- You've run `export_model.py` first to create the model
- The `ml_model` directory is in the same location as `api_server.py`

### API Connection Issues

If your Next.js app cannot connect to the Flask API:
- Ensure the Flask server is running on the correct port
- Check that the `ML_SERVER_URL` environment variable is set correctly
- Verify there are no firewall or network issues blocking the connection