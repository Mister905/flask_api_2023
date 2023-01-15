import os
import requests
from flask_jwt_extended.utils import create_refresh_token
from api.auth import bp
from flask import json, request, jsonify
from api.models import User
from api.schemas import UserSchema
from api import db
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, get_jwt
from api.blocklist import BLOCKLIST
from api import render_template

user_schema = UserSchema()


def send_simple_message(to, subject, body, html):

    return requests.post(
		f"https://api.mailgun.net/v3/{os.getenv('MAILGUN_DOMAIN')}/messages",
		auth=("api", f"{os.getenv('MAILGUN_API_KEY')}"),
		data={"from": f"Excited User <mailgun@{os.getenv('MAILGUN_DOMAIN')}>",
			"to": [to],
			"subject": subject,
			"text": body,
            "html": html})


@bp.route("/api/auth/load_active_user", methods=["GET"])
@jwt_required()
def load_active_user():
    
    current_user_id = get_jwt_identity()

    print(current_user_id)
    
    user = db.session.query(*[c for c in User.__table__.c if c.name != "password_hash"]).filter_by(id=current_user_id).first()
    
    if user:
        serialized_user = user_schema.dump(user)
        return jsonify({
            "success": 1,
            "user": serialized_user
        })
    else:
        return jsonify({
            "error": 1,
            "message": "Unable to load active user."
        })
     

@bp.route("/api/auth/login", methods=["POST"])
def login():

    email = request.json["email"]
    password = request.json["password"]

    if not email:
        return jsonify({
            "error": 1,
            "message": "Email is a required field."
        })

    if not password:
        return jsonify({
            "error": 1,
            "message": "Password is a required field."
        })

    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({
            "error": 1,
            "message": "Login unsuccessful."
        })

    elif not user.check_password(password):
        return jsonify({
            "error": 1,
            "message": "Login unsuccessful."
        })

    elif not user.activated:
        return jsonify({
            "error": 1,
            "message": "Account activation is required to login. Please check your email for an activation email"
        })

    else:
        access_token = create_access_token(identity=user.id, fresh=True)
        refresh_token = create_refresh_token(user.id)
        user = db.session.query(*[c for c in User.__table__.c if c.name != "password_hash"]).filter_by(email=email).first()
        serialized_user = user_schema.dump(user)
        return jsonify({
            "success": 1,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": serialized_user
        }), 201


@bp.route("/api/auth/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLOCKLIST.add(jti)
    return jsonify({
        "success": 1,
        "message": "Sucessfully logged out"
    }), 200


@bp.route("/api/auth/register", methods=["POST"])
def register():

    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    email = request.json["email"]
    password = request.json["password"]
    
    if not email:
        return jsonify({
            "error": 1,
            "message": "Email is a required field."
        }) 

    if not password:
        return jsonify({
            "error": 1,
            "message": "Password is a required field."
        })

    is_preexisting_account = User.query.filter_by(email=email).first()

    if is_preexisting_account:
        return jsonify({
            "error": 1,
            "message": "An account associated with that email already exists."
        })
    
    elif request.json["password"] != request.json["confirm_password"]:
        return jsonify({
            "error": 1,
            "message": "Confirm Password field must match password."
        })

    user = User(first_name=first_name, last_name=last_name, email=email)

    user.set_password(password)
    
    db.session.add(user)

    db.session.commit()

    send_simple_message(
        to=user.email,
        subject="User registration successful!",
        body=f"Hi {user.first_name}! You have successfully registered!",
        html=render_template("action.html", email=user.email, user_id=user.id)
    )

    return jsonify({
        "success": 1,
        "message": "User successfully created."
    }), 201


@bp.route("/api/auth/refresh", methods=["POST"])
@jwt_required(refresh=True)
def get_refresh_token():
    current_user = get_jwt_identity()
    refresh_token = create_access_token(identity=current_user, fresh=False)

    return jsonify({
        "success": 1,
        "refresh_token": refresh_token
    }), 200


@bp.route("/api/auth/activate/<int:user_id>", methods=["GET"])
def activate(user_id: int):
    user = User.query.filter_by(id=user_id).first()
    if user:
        user.activated = 1
        db.session.commit()
        return jsonify({
            "success": 1,
            "message": "User successfully activated."
        }), 200
