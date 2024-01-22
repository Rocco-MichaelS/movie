from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/movies")
def movies():
    # hardcoded movies 
    return {"movies": ["movie1", "movie2", "movie3"]}

if __name__ == "__main__":
    app.run(debug=True)
    