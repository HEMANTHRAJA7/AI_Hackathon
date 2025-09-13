import requests

print("Testing simple server...")
try:
    response = requests.get('http://127.0.0.1:8080/test', timeout=5)
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")