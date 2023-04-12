from api import ma
from marshmallow import fields
from werkzeug.datastructures import FileStorage


class BasicItemSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    price = fields.Float(required=True)


class BasicStoreSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()


class BasicTagSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)

# Inherits the BasicItemSchema class
class ItemSchema(BasicItemSchema):
    store_id = fields.Int(required=True, load_only=True)
    store = fields.Nested(BasicStoreSchema(), dump_only=True)
    tags = fields.List(fields.Nested(BasicTagSchema()), dump_only=True)


class ItemUpdateSchema(ma.Schema):
    name = fields.Str()
    price = fields.Float()


class StoreSchema(BasicStoreSchema):
    items = fields.List(fields.Nested(BasicItemSchema()), dump_only=True)
    tags = fields.List(fields.Nested(BasicTagSchema()), dump_only=True)


class TagSchema(BasicTagSchema):
    store_id = fields.Int(load_only=True)
    store = fields.Nested(BasicStoreSchema(), dump_only=True)
    items = fields.List(fields.Nested(BasicItemSchema()), dump_only=True)


class TagAndItemSchema(ma.Schema):
    message = fields.Str()
    item = fields.Nested(ItemSchema)
    tag = fields.Nested(TagSchema)


class UserSchema(ma.Schema):
    id = fields.Int()
    first_name = fields.String()
    last_name = fields.String()
    email = fields.Email()
    password_hash = fields.String()
    activated = fields.Bool()