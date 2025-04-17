from flask import Blueprint, request, current_app,jsonify
from classModels.user import Users
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import jwt
import datetime
from extensions import db

import base64
from cryptography.hazmat.primitives import hashes

login_bp = Blueprint('login', __name__)
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
            token = jwt.encode({
                "user_id": loginuser.PhoneNumber,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, current_app.config['SECRET_KEY'], algorithm="HS256")
                    
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
                "token": token 
            }), 201

    except Exception as e:
        print("Error during decryption - " + str(e))
        return jsonify({"message": "Error during login"}), 500
