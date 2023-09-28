import { Recipe } from "../types";

const get = () => fetch('/api/bookmarks/get')
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const bookmark = (recipe:Recipe) => fetch('/api/bookmarks/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({...recipe}),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const remove = (bookmark_id: number) => fetch('/api/bookmarks/remove', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        bookmark_id: bookmark_id
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

export {
    get,
    bookmark,
    remove
}