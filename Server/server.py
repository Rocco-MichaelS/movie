from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/movies": {"origins": "*"}})  # Allow all origins for the /movies route

# Sample movie data
movies = [
    {"title": "Movie 1", "genre": "Action", "year": 2020, "rating": 4},
    {"title": "Movie 2", "genre": "Comedy", "year": 2019, "rating": 4},
    {"title": "Movie 3", "genre": "Drama", "year": 2018, "rating": 4}
]

@app.route("/movies", methods=["GET"])
def get_movies():
    return jsonify({"movies": movies})

if __name__ == "__main__":
    app.run(debug=True)
