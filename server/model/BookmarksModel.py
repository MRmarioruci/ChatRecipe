from db import db
from sqlalchemy.exc import IntegrityError

class Bookmarks(db.Model):
    __tablename__ = 'Bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    name = db.Column(db.Text())
    description = db.Column(db.Text(), default=None)
    execution = db.Column(db.Text(), default=None)
    ingredients = db.Column(db.Text(), default=None)

class BookmarksModel:
    def add(self, user_id:int, name:str, description:str, execution:str, ingredients:str):
        if not user_id or not name or not description or not execution or not ingredients:
            return False
        
        try:
            new_bookmark = Bookmarks(
                name=name,
                description=description,
                execution=execution,
                ingredients=ingredients,
                user_id=user_id
            )
            db.session.add(new_bookmark)
            db.session.commit()

            return {
                'id': new_bookmark.id,
                'name': new_bookmark.name,
                'description': new_bookmark.description,
                'execution': new_bookmark.execution,
                'ingredients': new_bookmark.ingredients,
                'bookmarked': True
            }
        except IntegrityError as e:
            db.session.rollback()
            print(f"Insertion error: {str(e)}")
            return False
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred: {str(e)}")
            return False

    def remove(self, user_id: int, bookmark_id: int):
        if not user_id or not bookmark_id:
            return False

        bookmark = db.session.query(Bookmarks).get(bookmark_id)
        try:
            db.session.delete(bookmark)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred while deleting the bookmark: {str(e)}")
            return False
        
    def get(self, user_id=None, bookmark_id=None):
        bookmarks = Bookmarks.query.with_entities(
            Bookmarks.id,
            Bookmarks.name,
            Bookmarks.description,
            Bookmarks.execution,
            Bookmarks.ingredients,
        ).filter(
            (Bookmarks.id == bookmark_id)  if bookmark_id else True,
            Bookmarks.user_id == user_id
            #Bookmark.name.like('%' + name + '%')
        ).all()
        
        bookmarks = [{
            'id': bookmark.id,
            'name': bookmark.name,
            'description': bookmark.description,
            'execution': bookmark.execution,
            'ingredients': bookmark.ingredients
        } for bookmark in bookmarks]

        return bookmarks
