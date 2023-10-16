from flask import Flask
from controller import InventoryController, CreateController, BookmarksController, AuthenticationController
from db import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://mario:smilemalaka@localhost:3306/chatrecipe'
    db.init_app(app)
    
    inventoryController = InventoryController()
    createController = CreateController()
    bookmarksController = BookmarksController()
    authenticationController = AuthenticationController()
    authenticationController.login_manager.init_app(app)

    app.register_blueprint(inventoryController.blueprint, url_prefix='/api/inventory')
    app.register_blueprint(createController.blueprint, url_prefix='/api/create')
    app.register_blueprint(bookmarksController.blueprint, url_prefix='/api/bookmarks')
    app.register_blueprint(authenticationController.blueprint, url_prefix='/api/authentication')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

