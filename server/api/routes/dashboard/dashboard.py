from flask import Blueprint, jsonify, request, current_app
from classModels.questions import Question
from classModels.listings import Listing
import joblib
from extensions import db
from classModels.user import Users


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


@dashboard_bp.route('/dashboard/finalscore', methods=['POST'])
def update_final_Score():
    try:
        # Parse request data
        data = request.get_json()
        username = data.get('username')
        new_score = data.get('score')
        print(username)
        print('final score',new_score)

        if not username or new_score is None:
            return jsonify({"error": "Invalid input"}), 400

        # Find the user in the database
        user = Users.query.filter_by(PhoneNumber=username).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Update the user's score
        user.Points = new_score
        db.session.commit()

        return jsonify({"message": "Score updated successfully", "new_score": user.Points}), 200

    except Exception as e:
        # db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
