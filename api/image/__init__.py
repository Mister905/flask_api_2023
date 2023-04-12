from flask import Blueprint

bp = Blueprint("image", __name__)

from api.image import routes