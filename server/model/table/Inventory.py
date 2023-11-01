from db import db

class Inventory(db.Model):
    __tablename__ = 'Inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    description= db.Column(db.String(250))
    user_id = db.Column(db.Integer)