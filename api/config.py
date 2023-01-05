import os
import datetime
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("PRODUCTION_DATABASE_URI") or \
        "sqlite:///" + os.path.join(basedir, "app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False