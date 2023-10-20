from db import db
from sqlalchemy import Enum
from sqlalchemy.exc import IntegrityError

class Users(db.Model):
	__tablename__ = 'Users'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.Text())
	surname = db.Column(db.Text())
	email = db.Column(db.Text())
	accountType = db.Column(Enum('google', 'normal', name='account_types'))

	def _asdict(self):
		return {column.name: getattr(self, column.name) for column in self.__table__.columns}

class AuthenticationModel:
	def __init__(self) -> None:
		pass

	def get_user(self, email, public=False):
		if not email:
			return False
		
		user = Users.query.with_entities(
            Users.id,
			Users.name,
			Users.surname,
			Users.email,
			Users.accountType,
        ).filter(
            Users.email == email
        ).first()

		if not user:
			return None
		user = user._asdict()

		return user

	def register_user():
		pass
		