from flask import Blueprint, request, jsonify
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
        data = self.model.get()
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

        added = self.model.add(data)
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
        
        edited = self.model.edit(data['id'], data['changes'])
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
        
        deleted = self.model.delete(data['id'])
        if deleted:
            response['status'] ='ok'
            response['data'] = data['id']

        return jsonify(response)