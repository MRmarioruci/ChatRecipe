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
	
	def googleLogin(self):
		response = getResponse()
		""" data = request.get_json()
		if not data:
			response['error'] = 'Invalid input'
			return jsonify(response)
		
		recipes = self.model.create(data['currentRecipes'], data['inventory'])
		
		if recipes:
			response['status'] ='ok'
			response['data'] = recipes """

		return jsonify(response)
	
	def login(self):
		response = getResponse()
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