from flask import Flask, request
import json
import json


app = Flask(__name__)


@app.route('/convert_speech_to_sql', methods=['POST'])
def convert_speech_to_sql():
    data = request.get_json()
    return json.dumps({"sql": data["speech"] + "_sql"})


@app.route('/convert_sql_to_results', methods=['POST'])
def convert_sql_to_results():
    data = request.get_json()
    return json.dumps({"results": data["sql"] + "_results"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8080)

