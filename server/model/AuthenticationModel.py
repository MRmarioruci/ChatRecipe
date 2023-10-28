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
	password = db.Column(db.Text())

	def _asdict(self):
		return {column.name: getattr(self, column.name) for column in self.__table__.columns}

class AuthenticationModel:
	def __init__(self) -> None:
		pass

	def get_user(self, email, public=False, type=None):
		if not email:
			return False

		query = Users.query.with_entities(
            Users.id,
			Users.name,
			Users.surname,
			Users.email,
			Users.accountType,
			Users.password
        ).filter(
            Users.email == email,
        )
		if type:
			query = query.filter(Users.accountType == type)

		user = query.first()
		if not user:
			return None
		
		user = user._asdict()

		if public:
			del user['password']

		return user
	
	@staticmethod
	def get_user_by_id(id):
		if not id:
			return False

		query = Users.query.with_entities(
            Users.id,
			Users.name,
			Users.surname,
			Users.email,
			Users.accountType,
			Users.password
        ).filter(
            Users.id == id,
        )
		user = query.first()
		if not user:
			return None
		
		return user._asdict()

	def register_user(self, email, name, surname, picture, password=None, accountType="normal", bcrypt=None):
		if not email or not accountType or not bcrypt or not name or not surname:
			return False
		
		if password:
			password = bcrypt.generate_password_hash(password).decode('utf-8')
		
		new_user = Users(
            name = name,
			surname = surname,
			email = email,
			accountType = accountType,
			password = password
        )
		db.session.add(new_user)
		db.session.commit()

		created_user = new_user._asdict()
		created_user['id'] = new_user.id

		return created_user
		