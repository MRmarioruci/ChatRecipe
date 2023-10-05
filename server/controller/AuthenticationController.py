import requests
from flask import Blueprint, request, jsonify
from model import AuthenticationModel

def getResponse():
	return {'status': 'error', 'data': None}

class AuthenticationController:
	def __init__(self):
		self.model = AuthenticationModel()
		self.blueprint = Blueprint('authentication', __name__)
		self.register_routes()
		
	def register_routes(self):
		self.blueprint.add_url_rule('/googleLogin', view_func=self.googleLogin, methods=['POST'])
		self.blueprint.add_url_rule('/login', view_func=self.login, methods=['POST'])
		self.blueprint.add_url_rule('/isLogged', view_func=self.isLogged, methods=['GET'])
		self.blueprint.add_url_rule('/googleRegistration', view_func=self.googleRegistration, methods=['POST'])
		self.blueprint.add_url_rule('/registration', view_func=self.registration, methods=['POST'])
	
	def getGoogleUserProfile(self, data):
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

	def googleLogin(self):
		response = getResponse()
		data = request.get_json()
		if not data:
			response['error'] = 'Invalid input'
			return jsonify(response)
		
		google_user_info = self.getGoogleUserProfile(data)
		if not google_user_info:
			response['error'] = 'Could not retrieve google user profile'
			return jsonify(response)
		
		user = self.model.getUser(google_user_info['email'], False)
		if not user:
			response['error'] = 'The user is not registered with us. Please register first.'
			return jsonify(response)
		
		""" Invoke to login logic here...s """
		return jsonify(response)
	
	def login(self):
		response = getResponse()
		data = request.get_json()
		if not data:
			response['error'] = 'Inavlid input'
			return jsonify(response)
		
		user = self.model.getUser(data['email'], False)
		if not user:
			response['error'] = 'The user is not registered with us. Please register first.'
			return jsonify(response)
			
		""" Check password and the invoke the login logic """
		return jsonify(response)
	
	def isLogged(self):
		response = getResponse()
		return jsonify(response)
	
	def googleRegistration(self):
		response = getResponse()
		return jsonify(response)
	
	def registration(self):
		response = getResponse()
		return jsonify(response)