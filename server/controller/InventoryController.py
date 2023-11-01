from flask import Blueprint, request, jsonify
from flask_login import current_user
from model import InventoryModel

def get_response():
    return {'status': 'error', 'data': None}

class InventoryController:
    def __init__(self):
        self.model = InventoryModel()
        self.blueprint = Blueprint('inventory', __name__)
        self.register_routes()

    def register_routes(self):
        self.blueprint.add_url_rule('/get', view_func=self.get, methods=['GET'])
        self.blueprint.add_url_rule('/add', 'add', self.add, methods=['POST'])
        self.blueprint.add_url_rule('/edit', 'edit', self.edit, methods=['POST'])
        self.blueprint.add_url_rule('/delete', 'delete', self.delete, methods=['POST'])

    def get(self):
        response = get_response()
        if current_user.is_authenticated:
            data = self.model.get(current_user.id)
            if data:
                response['status'] = 'ok'
                response['data'] = data

        return jsonify(response)

    def add(self):
        response = get_response()
        data = request.get_json()
        if not data:
            response['data'] = 'Invalid input'
            return jsonify(response)

        if current_user.is_authenticated:
            added = self.model.add(data, current_user.id)
            if added:
                response['status'] ='ok'
                response['data'] = added

        return jsonify(response)
    
    def edit(self):
        response = get_response()
        data = request.get_json()
        if not data:
            response['data'] = 'Invalid input'
            return jsonify(response)
        
        if current_user.is_authenticated:
            edited = self.model.edit(data['id'], data['changes'], current_user.id)
            if edited:
                response['status'] ='ok'
                response['data'] = edited

        return jsonify(response)
    
    def delete(self):
        response = get_response()
        data = request.get_json()
        if not data:
            response['data'] = 'Invalid input'
            return jsonify(response)
        if current_user.is_authenticated:
            deleted = self.model.delete(data['id'], current_user.id)
            if deleted:
                response['status'] ='ok'
                response['data'] = data['id']

        return jsonify(response)