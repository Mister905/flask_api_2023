from flask import json, request, jsonify
from api.tag import bp
from api.schemas import TagAndItemSchema, ItemSchema, BasicTagSchema
from api.models.item import Item
from api.models.tag import Tag
from api import db
from flask_jwt_extended import jwt_required


item_and_item_schema = TagAndItemSchema()
item_schema = ItemSchema()

tag_schema = BasicTagSchema()


@bp.route("/api/tag/<int:id>", methods=["GET"])
@jwt_required()
def get_tag(id: int):

    tag = Tag.query.filter_by(id=id).first()

    if tag:

        serialized_tag = tag_schema.dump(tag)

        return jsonify({
            "tag": serialized_tag
        })
    
    else:
        return jsonify({
            "error": 1,
            "message": "Tag not found"
        }), 404


@bp.route("/api/tag/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_tag(id: int):
    
    tag = Tag.query.filter_by(id=id).first()
    
    if tag:
        db.session.delete(tag)
        db.session.commit()

        return jsonify({
            "success": 1,
            "message": "Tag deletion successful"
        }), 202

    else:
        return jsonify({
            "error": 1,
            "message": "Tag not found."
        }), 404

@bp.route("/api/item/<string:item_id>/tag/<string:tag_id>", methods=["POST"])
@jwt_required()
def createTagItemLink(item_id, tag_id):

    item = Item.query.filter_by(id=item_id).first()

    tag = Tag.query.filter_by(id=tag_id).first()

    if item and tag:

        item.tags.append(tag)
    
        db.session.add(item)
    
        db.session.commit()

        serialized_item = item_schema.dump(item)
    
        return jsonify({
            "success": 1,
            "message": "Tag and item link creation successful",
            "item": serialized_item
        }), 201


@bp.route("/api/item/<string:item_id>/tag/<string:tag_id>", methods=["DELETE"])
@jwt_required()
def deleteTagItemLink(item_id, tag_id):

    item = Item.query.filter_by(id=item_id).first()

    tag = Tag.query.filter_by(id=tag_id).first()

    if item and tag:

        item.tags.remove(tag)
    
        db.session.add(item)
    
        db.session.commit()

        serialized_item = item_schema.dump(item)
    
        return jsonify({
            "success": 1,
            "message": "Tag and item link deletion successful",
            "item": serialized_item
        }), 201