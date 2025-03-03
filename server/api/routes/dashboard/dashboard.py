from flask import Blueprint, jsonify, request, current_app
from classModels.questions import Question
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
        isWinner=data.get('isWinner')

        print('IsWinner:',isWinner)
        print('final score',new_score)

        if not username or new_score is None:
            return jsonify({"error": "Invalid input"}), 400

        # Find the user in the database
        user = Users.query.filter_by(PhoneNumber=username).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Update the user's score
        user.Points = new_score
        user.IsWinner=isWinner
        db.session.commit()

        return jsonify({"message": "Score updated successfully", "new_score": user.Points}), 200

    except Exception as e:
        # db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@dashboard_bp.route("/dashboard/send-sms", methods=["POST"])
def send_sms():
    data = request.json  # Get JSON data from React frontend
    mobile_number = data.get("mobile_number")
    message_text = data.get("message")

    if not mobile_number or not message_text:
        return jsonify({"error": "Mobile number and message are required"}), 400

    # Send SMS
    response = sms.send_message({
        "from": "FestIQ",
        "to": mobile_number,
        "text": message_text,
    })

    # Check response
    if response["messages"][0]["status"] == "0":
        return jsonify({"success": True, "message": "SMS sent successfully"})
    else:
        return jsonify({"success": False, "message": response["messages"][0]["error-text"]}), 400

