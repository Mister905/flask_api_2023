from api import ma
from marshmallow import fields


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
    items = fields.List(fields.Nested(BasicItemSchema()), dump_only=True)
    store = fields.Nested(BasicStoreSchema(), dump_only=True)
    