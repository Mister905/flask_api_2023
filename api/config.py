import os
import datetime
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("PRODUCTION_DATABASE_URI") or \
        "sqlite:///" + os.path.join(basedir, "app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Only accept requests that are up to 1MB in size
    MAX_CONTENT_LENGTH = 1024 * 1024
    UPLOAD_EXTENSIONS = ['.jpg', '.png', '.gif', 'png']
    UPLOAD_PATH = './uploads'
    BUCKET = "react-flask-art-gallery-aws-s3-bucket"