from api import db

class Store(db.Model):
    __tablename__ = "stores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    tags = db.relationship("Tag", back_populates="store", lazy="dynamic")
    items = db.relationship("Item", back_populates="store", lazy="dynamic")
    