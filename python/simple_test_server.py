from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    print("Starting simplified test server...")
    app.run(port=8080, debug=False)