from flask import Flask
from api.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

# Factory pattern
def create_app():
    
    app = Flask(__name__)
    
    app.config.from_object(Config)

    db.init_app(app)

    ma.init_app(app)

    from api.store import bp as store_bp
    app.register_blueprint(store_bp)

    from api.item import bp as item_bp
    app.register_blueprint(item_bp)


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
