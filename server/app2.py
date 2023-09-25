from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://mario:smilemalaka@localhost:3306/chatrecipe'
db = SQLAlchemy(app)

class Inventory(db.Model):
    __tablename__ = 'Inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250))
    description= db.Column(db.String(250))

@app.route('/')
def index():
    add()
    return 'Cool'

def add():
    try:
        new_item = Inventory(
            title='<arop',
            description='Description',
        )
        db.session.add(new_item)
        db.session.commit()
    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug=True)
    
