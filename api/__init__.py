from flask import Flask, jsonify
from api.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended.jwt_manager import JWTManager

db = SQLAlchemy()
ma = Marshmallow()
jwt = JWTManager()

# Factory pattern
def create_app():
    
    app = Flask(__name__)
    
    app.config.from_object(Config)

    db.init_app(app)

    ma.init_app(app)

    jwt.init_app(app)

    from api.store import bp as store_bp
    app.register_blueprint(store_bp)

    from api.item import bp as item_bp
    app.register_blueprint(item_bp)

    from api.tag import bp as tag_bp
    app.register_blueprint(tag_bp)

    from api.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify({"message": "The token has expired.", "error": "token_expired"}),
            401,
        )

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed.", "error": "invalid_token"}
            ),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {
                    "description": "Request does not contain an access token.",
                    "error": "authorization_required",
                }
            ),
            401,
        )

    @app.cli.command("db_seed")
    def db_seed():

        from api.models.store import Store
        
        test_store = Store(name = "Best Buy")

        db.session.add(test_store)
        
        db.session.commit()

        print("Database Seeded!")

    @app.cli.command("db_create")
    def db_create():

        db.create_all()
        print("Database Created!")

    @app.cli.command("db_drop")
    def db_drop():

        db.drop_all()
        print("Database dropped!")

    return app
