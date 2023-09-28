from flask import Blueprint, request, jsonify
from model import BookmarksModel

def get_response():
    return {"status": "error", "data": None}

class BookmarksController:
    def __init__(self):
        self.model = BookmarksModel()
        self.blueprint = Blueprint('bookmarks', __name__)
        self.register_routes()

    def register_routes(self):
        self.blueprint.add_url_rule('/get', view_func=self.get, methods=['GET'])
        self.blueprint.add_url_rule('/remove', view_func=self.remove, methods=['POST'])
        self.blueprint.add_url_rule('/add', view_func=self.add, methods=['POST'])

    def add(self):
        response = get_response()
        data = request.get_json(force=True)
        added = self.model.add(1, **data)
        if added:
            response['status'] = 'ok'
            response['data'] = added

        return jsonify(response)

    def remove(self):
        response = get_response()
        data = request.get_json(force=True)
        removed = self.model.remove(1, data['bookmark_id'])
        if removed:
            response['status'] = 'ok'
            response['data'] = True

        return jsonify(response)

    def get(self):
        response = get_response()
        bookmark_id = request.args.get('bookmark_id')
        modelResponse = self.model.get(1, bookmark_id)
        if not modelResponse:
            return jsonify(response)
        
        return jsonify(modelResponse)