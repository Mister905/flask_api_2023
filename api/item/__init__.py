from flask import Blueprint

bp = Blueprint("item", __name__)

from api.item import routes