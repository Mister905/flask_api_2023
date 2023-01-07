from flask import json, request, jsonify
from api.store import bp
from api.schemas import StoreSchema, BasicTagSchema, BasicItemSchema, TagAndItemSchema
from api.models.store import Store
from api.models.tag import Tag
from api.models.item import Item
from api import db
from flask_jwt_extended import jwt_required


store_schema = StoreSchema()
stores_schema = StoreSchema(many=True)

tag_schema = BasicTagSchema()
tags_schema = BasicTagSchema(many=True)

item_schema = BasicItemSchema()

tag_and_item_schema = TagAndItemSchema()

@bp.route("/api/store", methods=["GET"])
@jwt_required()
def get_stores():

    stores = Store.query.all()

    serialized_stores = stores_schema.dump(stores)

    return jsonify({
        "stores": serialized_stores
    })


@bp.route("/api/store/<int:id>", methods=["GET"])
@jwt_required()
def get_store(id: int):
    
    store = Store.query.filter_by(id=id).first()
    
    if store:
        serialized_store = store_schema.dump(store)
        return jsonify({"store": serialized_store})
    
    else:
        return jsonify({
            "error": 1,
            "message": "Store not found"
        }), 404


@bp.route("/api/store", methods=["POST"])
@jwt_required()
def create_store():
    
    name = request.json["name"]

    new_store = Store(name=name)
    
    serialized_store = store_schema.dump(new_store)

    db.session.add(new_store)
    
    db.session.commit()
    
    return jsonify({
        "success": 1,
        "message": "Store creation successful",
        "store": serialized_store
    }), 201


@bp.route("/api/store/<int:id>", methods=["PUT"])
@jwt_required()
def update_store(id: int):
    
    store = Store.query.filter_by(id=id).first()
    
    if store:

        store.name = request.json["name"] 
    
        db.session.commit()

        return jsonify({
            "success": 1,
            "message": "Store update successful"
        }), 202

    else:
        return jsonify({
            "error": 1,
            "message": "Store update failed"
        }), 404


@bp.route("/api/store/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_store(id: int):
    
    store = Store.query.filter_by(id=id).first()
    
    if store:
        db.session.delete(store)
        db.session.commit()

        return jsonify({
            "success": 1,
            "message": "Store deletion successful"
        }), 202

    else:
        return jsonify({
            "error": 1,
            "message": "Blog post not found."
        }), 404


@bp.route("/api/store/<int:id>/tag", methods=["GET"])
@jwt_required()
def get_store_tags(id: int):

    store = Store.query.filter_by(id=id).first()

    if store:

        tags = store.tags

        serialized_tags = tags_schema.dump(tags)

        return jsonify({
            "tags": serialized_tags
        })
    
    else:
        return jsonify({
            "error": 1,
            "message": "Tag not found"
        }), 404


@bp.route("/api/store/<int:id>/tag", methods=["POST"])
def create_store_tag(id= int):
    
    name = request.json["name"]

    new_tag = Tag(name=name, store_id=id)
    
    serialized_tag = tag_schema.dump(new_tag)

    db.session.add(new_tag)
    
    db.session.commit()
    
    return jsonify({
        "success": 1,
        "message": "Tag creation successful",
        "store": serialized_tag
    }), 201


@bp.route("/api/store/<int:id>/item", methods=["POST"])
@jwt_required()
def create_store_item(id=int):
    
    name = request.json["name"]

    price = request.json["price"]

    new_item = Item(name=name, price=price, store_id=id)
    
    serialized_item = item_schema.dump(new_item)

    db.session.add(new_item)
    
    db.session.commit()
    
    return jsonify({
        "success": 1,
        "message": "Item creation successful",
        "store": serialized_item
    }), 201
