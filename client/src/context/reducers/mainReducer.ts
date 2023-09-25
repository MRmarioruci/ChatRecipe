import { MainState, StateAction, Recipe } from "../../types";
const mainReducer = (state: MainState, action: StateAction) => {
    switch (action.type) {
        case 'RECIPES_SET':
            return {...state, recipes: action.payload };
        case 'RECIPES_BOOKMARK':
            return {...state, recipes: state.recipes.map((recipe: Recipe, index:number) => {
                if(index === action.payload) recipe.bookmarked = true;
                return recipe;
            })}
        default:
            return state;
    }
}
export default mainReducer