from flask_jwt_extended.utils import create_refresh_token
from api.auth import bp
from flask import json, request, jsonify
from api.models import User
from api.schemas import UserSchema
from api import db
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, get_jwt
from api.blocklist import BLOCKLIST

user_schema = UserSchema()


@bp.route("/api/auth/load_active_user", methods=["GET"])
@jwt_required()
def load_active_user():
    
    current_user_id = get_jwt_identity()
    
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
        })


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
    confirm_password = request.json["confirm_password"]
    
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
