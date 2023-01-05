from flask import Blueprint

bp = Blueprint("store", __name__)

from api.store import routes