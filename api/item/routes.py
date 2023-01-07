from flask import json, request, jsonify
from api.item import bp
from api.schemas import ItemSchema
from api.models.item import Item
from flask_jwt_extended import jwt_required


item_schema = ItemSchema()
items_schema = ItemSchema(many=True)


@bp.route("/api/item", methods=["GET"])
@jwt_required()
def get_items():

    items = Item.query.all()

    serialized_items = item_schema.dump(items)

    return jsonify({
        "items": serialized_items
    })


@bp.route("/api/item/<int:id>", methods=["GET"])
@jwt_required()
def get_item(id: int):
    
    item = Item.query.filter_by(id=id).first()
    
    if item:
        serialized_item = item_schema.dump(item)
        return jsonify({"item": serialized_item})
    
    else:
        return jsonify({
            "error": 1,
            "message": "Item not found"
        }), 404
