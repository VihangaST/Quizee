# login.py
from flask import Blueprint, request, current_app,jsonify
from classModels.user import Users
from cryptography.hazmat.primitives.asymmetric import padding
import base64
from cryptography.hazmat.primitives import hashes
import jwt
import datetime
from extensions import db

import base64
from cryptography.hazmat.primitives import hashes

login_bp = Blueprint('login', __name__)
SECRET_KEY = 'procall'

@login_bp.route('/test')
def get_test_message():
    return jsonify("Hello there")

@login_bp.route('/login', methods=['POST'])
def authenticate():
    try:
        data = request.get_json()
        username = data.get('username')
        # Secret key for encoding and decoding JWT
    
        if not username:
            return jsonify({"message": "Username is required"}), 400

        # Query the database for the user
        loginuser = Users.query.filter_by(PhoneNumber=username).first()
        if loginuser:
            # Assuming the Users model has a 'score' field
            score = loginuser.Points if loginuser.Points is not None else 0
            token=6233
                    
            return jsonify({
                            "message": "Login successful",
                            "user": {"userID": loginuser.PhoneNumber},
                            "score": score,
                            "isWinner": loginuser.IsWinner,
                            "questionanswered":0,
                            "token": token
                        }), 200
        else:
            # New user registration
            new_user = Users(PhoneNumber=username, Points=0)  # Default points set to 0
            db.session.add(new_user)
            db.session.commit()

            return jsonify({
                "message": "New user registered successfully",
                "user": {"userID": username},
                "score": 0,
                "questionanswered": 0,
                "token": 6233  # Replace with actual token generation logic
            }), 201

    except Exception as e:
        print("Error during decryption - " + str(e))
        return jsonify({"message": "Error during login"}), 500

        
# def validate_token(token):
#     try:
#         decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
#         return decoded_token['userId']
#     except jwt.ExpiredSignatureError:
#         # throw the exception to the caller
#         raise jwt.ExpiredSignatureError("Token expired")
#     except jwt.InvalidTokenError:
#          # throw the exception to the caller
#         raise jwt.InvalidTokenError("Invalid token")
#     except Exception as e:
#          # throw the exception to the caller
#         raise e