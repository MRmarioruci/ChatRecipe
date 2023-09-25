from flask import Flask
from controller import InventoryController, CreateController, BookmarksController
from db import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://USER:PASSWORD@localhost:3306/DATABASE'
    db.init_app(app)
    
    inventoryController = InventoryController()
    createController = CreateController()
    bookmarksController = BookmarksController()

    app.register_blueprint(inventoryController.blueprint, url_prefix='/api/inventory')
    app.register_blueprint(createController.blueprint, url_prefix='/api/create')
    app.register_blueprint(bookmarksController.blueprint, url_prefix='/api/bookmarks')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

