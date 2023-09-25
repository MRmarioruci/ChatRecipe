import { Recipe as RecipeType } from '../types';

type PropTypes = {
    recipe: RecipeType;
    idx: number;
    showIngredients: boolean;
}
function Recipe({recipe, idx, showIngredients}: PropTypes) {
	return (
		<div key={`recipe__${idx}`} className="recipe__item">
            <div>{idx+1}</div>
            <div>
                <h4>{recipe.name}</h4>
                <div>{recipe.description}</div>
                <div>
                    <label>Ingredients</label>
                    <div dangerouslySetInnerHTML={{ __html: recipe.ingredients }}></div>
                </div>
            </div>
        </div>
	)
}

export default Recipe