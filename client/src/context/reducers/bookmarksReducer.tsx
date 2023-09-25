import { StateAction, Recipe } from "../../types";
const bookmarksReducer = (state: Recipe[], action: StateAction) => {
    switch (action.type) {
        case 'BOOKMARKS_SET':
            return action.payload;
        case 'BOOKMARKS_DELETE':
            return state.filter((recipe:Recipe) => recipe.id !== action.payload);
        case 'BOOKMARKS_ADD':
            return [...state, ...[action.payload]];
        default:
            return state;
    }
}
export default bookmarksReducer