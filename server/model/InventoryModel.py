from flask import jsonify
from db import db
from .table import Inventory
import random

class InventoryModel:
    def __init__(self):
        self.colors = ["#6499E9","#9EDDFF","#A6F6FF","#BEFFF7","#BC7AF9","#F8FF95","#A6FF96","#FF6969","#C70039","#EC53B0","#E4A5FF","#FFAAC9","#00CCFF","#FFCDA8","#45FFCA","#33CC99","#FF6633","#FF99FF","#66FF33","#993333"]

    def get(self, user_id):
        items = Inventory.query.with_entities(
            Inventory.title,
            Inventory.description,
            Inventory.id,
        ).filter(
            Inventory.user_id == user_id,
        ).all()
        items = [{'id': item.id, 'title': item.title, 'description': item.description, 'color': random.choice(self.colors)} for item in items]
        return items

    def add(self, item, user_id):
        new_item = Inventory(
            title=item['title'],
            description=item['description'],
            user_id = user_id
        )
        db.session.add(new_item)
        db.session.commit()
        item['id'] = new_item.id
        item['color'] = random.choice(self.colors)
        return item

    def delete(self, id, user_id):
        item = Inventory.query.filter_by(id=id, user_id=user_id).first()
        if item:
            db.session.delete(item)
            db.session.commit()
            return id
        else:
            return False

    def edit(self, id, changes, user_id):
        allowed = ['title', 'description']

        for key in changes:
            if key in allowed:
                item = Inventory.query.filter_by(id=id, user_id=user_id).first()
                if item:
                    setattr(item, key, changes[key])
                    db.session.commit()
                    return {
                        "id": id,
                        "key": key,
                        "value": changes[key]
                    }
        return None