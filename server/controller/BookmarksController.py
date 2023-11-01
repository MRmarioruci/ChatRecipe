from flask import Blueprint, request, jsonify
from flask_login import current_user
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
		if current_user.is_authenticated:
			data.pop('id') if 'id' in data else None
			data.pop('bookmarked') if 'bookmarked' in data else None
			data.pop('image') if 'image' in data else None

			added = self.model.add(current_user.id, **data)
			if added:
				response['status'] = 'ok'
				response['data'] = added

		return jsonify(response)

	def remove(self):
		response = get_response()
		if current_user.is_authenticated:
			data = request.get_json(force=True)
			removed = self.model.remove(current_user.id, data['bookmark_id'])
			if removed:
				response['status'] = 'ok'
				response['data'] = True

		return jsonify(response)

	def get(self):
		response = get_response()
		if current_user.is_authenticated:
			bookmark_id = request.args.get('bookmark_id')
			modelResponse = self.model.get(current_user.id, bookmark_id)
			if not modelResponse:
				return jsonify(response)
			
			response['status'] = 'ok'
			response['data'] = modelResponse
		return jsonify(response)