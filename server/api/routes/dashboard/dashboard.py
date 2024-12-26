from flask import Blueprint, jsonify, request, current_app
from classModels.questions import Question
from classModels.listings import Listing
import joblib


dashboard_bp = Blueprint('dashboard', __name__)
@dashboard_bp.route('/dashboard/questioncount', methods=['GET'])
def get_question_count():
    try:
        question_count = Question.query.count()
        print('question_count:', question_count)

        if question_count:
            # Convert the list of SQLAlchemy objects to a list of dictionaries
            return jsonify({"count": question_count}), 200
        else:
            # Handle the case where no properties are found
            return jsonify({"message": "No Questions found"}), 404
    except Exception as e:
        # Log or print the error for debugging
        print(f"Error fetching property data: {e}")
        return jsonify({"message": "An error occurred while fetching property data"}), 500
