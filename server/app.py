from flask import Flask
from flask_bcrypt import Bcrypt
from controller import InventoryController, CreateController, BookmarksController, AuthenticationController
from db import db
from uuid import uuid4
from dotenv import load_dotenv
import random
import string
import os

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:{int(os.getenv("DB_PORT"))}/{os.getenv("DB_NAME")}'
    app.config['SECRET_KEY'] = ''.join(random.choices(string.ascii_letters + string.digits, k=30))
    app.config['PERMANENT_SESSION_LIFETIME'] = 1800 # = 30 minutes
    bcrypt = Bcrypt(app)
    db.init_app(app)
    
    inventory_controller = InventoryController()
    create_controller = CreateController()
    bookmarks_controller = BookmarksController()
    authentication_controller = AuthenticationController(bcrypt)
    authentication_controller.login_manager.init_app(app)

    app.register_blueprint(inventory_controller.blueprint, url_prefix='/api/inventory')
    app.register_blueprint(create_controller.blueprint, url_prefix='/api/create')
    app.register_blueprint(bookmarks_controller.blueprint, url_prefix='/api/bookmarks')
    app.register_blueprint(authentication_controller.blueprint, url_prefix='/api/authentication')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

