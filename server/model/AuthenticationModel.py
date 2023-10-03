from db import db
from sqlalchemy.exc import IntegrityError

""" class Bookmarks(db.Model):
    __tablename__ = 'Bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    name = db.Column(db.Text())
    description = db.Column(db.Text(), default=None)
    execution = db.Column(db.Text(), default=None)
    ingredients = db.Column(db.Text(), default=None) """

class AuthenticationModel:
    pass