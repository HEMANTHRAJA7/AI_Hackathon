# Credit Card Approval Prediction

This project implements a machine learning system that predicts credit card approval based on an SVM model developed in a Jupyter notebook. It uses a Next.js frontend and a Flask Python backend.

## Project Structure

- `/app`: Next.js application code
  - `/api/predict`: API route for prediction
  - `/prediction`: Prediction page frontend
- `/components`: React components
  - `prediction-form.tsx`: Form for collecting prediction inputs
  - `prediction-results.tsx`: Component for displaying prediction results
- `/python`: Backend Python code
  - `api_server.py`: Flask server that serves the SVM model
  - `notebook_model_export.py`: Script to export the model from the notebook
  - `/ml_model`: Directory containing the exported model files

## Setup Instructions

### 1. Install Dependencies

#### Frontend (Next.js)
```bash
# Install frontend dependencies
npm install
# or
yarn install
# or
pnpm install
```

#### Backend (Python)
```bash
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install flask flask-cors pandas numpy scikit-learn
```

### 2. Start the Backend Server

```bash
# Navigate to the python directory
cd python

# Start the Flask server
python api_server.py
```

The Flask server will run on http://localhost:8000.

### 3. Start the Frontend Server

```bash
# In a new terminal, start the Next.js development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The Next.js server will run on http://localhost:3000.

## Usage

1. Open your browser and go to http://localhost:3000/prediction
2. Fill out the loan application form with relevant information
3. Click "Get Prediction" to see the results

## Implementation Details

- The SVM model is trained on credit card application data and exported from a Jupyter notebook
- The model uses features such as income, credit score, loan amount, etc.
- The Flask server loads the model and makes predictions
- The Next.js frontend collects user inputs and displays the prediction results

## Troubleshooting

- If the Flask server connection fails, the Next.js API will fall back to a simplified prediction model
- Check that the Flask server is running on port 8000
- Check the browser console for any API errors