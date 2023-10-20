import requests
from flask import Blueprint, request, jsonify
from flask_login import LoginManager, UserMixin, login_user
from model import AuthenticationModel

def get_response():
	return {'status': 'error', 'data': None}

class User(UserMixin):
	def __init__(self, data):
		print(data)
		self.name, self.surname, self.email, self.accountType = data
		
class AuthenticationController:
	def __init__(self):
		self.model = AuthenticationModel()
		self.blueprint = Blueprint('authentication', __name__)
		self.login_manager = LoginManager()
		self.register_routes()
	
	""" @login_manager.user_loader
	def load_user(user_id):
		# Replace this with your logic to load a user from the database
		pass """

	def register_routes(self):
		self.blueprint.add_url_rule('/google_login', view_func=self.google_login, methods=['POST'])
		self.blueprint.add_url_rule('/login', view_func=self.login, methods=['POST'])
		self.blueprint.add_url_rule('/is_logged', view_func=self.is_logged, methods=['GET'])
		self.blueprint.add_url_rule('/google_registration', view_func=self.google_registration, methods=['POST'])
		self.blueprint.add_url_rule('/registration', view_func=self.registration, methods=['POST'])
	
	def get_google_user_profile(self, data):
		try:
			access_token = data['access_token']
			response = requests.get('https://www.googleapis.com/oauth2/v3/userinfo', 
				headers={'Authorization': 'Bearer ' + access_token})

			if response.status_code == 200:
				user_info = response.json()
				return user_info
			else:
				print('failed to fetch google user profile')
				return None
		except Exception as e:
			print({"error": str(e)})

		return None

	def google_login(self):
		response = get_response()
		data = request.get_json()
		if not data:
			response['data'] = 'Invalid input'
			return jsonify(response)
		
		google_user_info = self.get_google_user_profile(data)
		if not google_user_info:
			response['data'] = 'Could not retrieve google user profile'
			return jsonify(response)
		
		user = self.model.get_user(google_user_info['email'], True)
		if not user:
			response['data'] = 'The user is not signed with us. Please sign up first.'
			return jsonify(response)
		
		login_user(User(user))

		response['data'] = user
		response['status'] = 'ok'
		return jsonify(response)
	
	def login(self):
		response = get_response()
		data = request.get_json()
		if not data:
			response['data'] = 'Invalid input'
			return jsonify(response)
		
		user = self.model.get_user(data['email'], False)
		if not user:
			response['data'] = 'The user is not signed with us. Please sign up first.'
			return jsonify(response)
			
		""" Check password and the invoke the login logic """
		return jsonify(response)
	
	def is_logged(self):
		response = get_response()
		return jsonify(response)
	
	def google_registration(self):
		response = get_response()
		data = request.get_json()
		if not data:
			response['data'] = 'Invalid input'
			return jsonify(response)
		
		google_user_info = self.get_google_user_profile(data)
		if not google_user_info:
			response['data'] = 'Could not retrieve google user profile'
			return jsonify(response)
		
		user = self.model.get_user(google_user_info['email'], True)
		if user:
			response['data'] = 'The user is already registered. Sign in, or use another account.'
			return jsonify(response)
		

		self.model.register_user(google_user_info['email'])
		#login_user(User(user))

		response['data'] = user
		response['status'] = 'ok'
		return jsonify(response)
	
	def registration(self):
		response = get_response()
		return jsonify(response)