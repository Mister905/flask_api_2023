from flask import Blueprint

bp = Blueprint("tag", __name__)

from api.tag import routes