import { Recipe } from "../types";

const _get = () => fetch('/api/bookmarks/get')
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _bookmark = (recipe:Recipe) => fetch('/api/bookmarks/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({...recipe}),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _remove = (bookmark_id: number) => fetch('/api/bookmarks/remove', {
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
    _get,
    _bookmark,
    _remove
}