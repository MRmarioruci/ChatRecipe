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

	def as_dict(self):
		return {
			'id': self.id,
			'name': self.name,
			'surname': self.surname,
			'email': self.email,
			'accountType': self.accountType
		}

class AuthenticationModel:
	def __init__(self) -> None:
		pass
	pass

	def getUser(self, email, public=False):
		if not email:
			return False
		
		user = Users.query.with_entities(
            Users.id if(not public) else None,
			Users.name,
			Users.surname,
			Users.email,
			Users.accountType,
        ).filter(
            Users.email == email
        ).first()

		if not user:
			return None
		
		return user.as_dict()

		