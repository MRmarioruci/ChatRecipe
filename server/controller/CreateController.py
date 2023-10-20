from flask import Blueprint, request, jsonify
from model import CreateModel

def get_response():
    return {'status': 'error', 'data': None}

class CreateController:
    def __init__(self):
        self.model = CreateModel()
        self.blueprint = Blueprint('create', __name__)
        self.register_routes()
        
    def register_routes(self):
        self.blueprint.add_url_rule('/', view_func=self.create, methods=['POST'])
    
    def create(self):
        response = get_response()
        data = request.get_json()
        if not data:
            response['error'] = 'Invalid input'
            return jsonify(response)
        
        recipes = self.model.create(data['currentRecipes'], data['inventory'])
        
        if recipes:
            response['status'] ='ok'
            response['data'] = recipes

        return jsonify(response)