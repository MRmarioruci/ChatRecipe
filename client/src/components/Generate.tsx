import { useState, useCallback, useRef } from 'react'
/* import Lottie from 'react-lottie-player'
import creatingAnimation from '../assets/animations/creating.json';
import errorAnimation from '../assets/animations/error.json';
import { Link } from'react-router-dom'; */
import cookAnimation from '../assets/animations/cook.json';
import Lottie from 'react-lottie-player';
import { _create } from '../api/createApi';
import { Recipe as RecipeType } from '../types';
/* import Recipe from './Recipe';
import IngredientsModal from './Create/IngredientsModal';
import InstructionsModal from './Create/InstructionsModal'; */
import useCombinedStore from '../State';
import Recipes from '../pages/Recipes';

type ApiResponse = {
	status: 'ok' | 'error',
	data: string
}
function Generate() {
	console.log('component rerendered...')
	const [error, setError] = useState<null | string>(null);
	const [loading, setLoading] = useState<boolean>(false);
	/* const [ingredientsModal, setIngredientsModal] = useState<boolean>(false); */
	const [showRecipes, setShowRecipes] = useState<boolean>(false);
	/* const [instructionsModal, setInstructionsModal] = useState<boolean | RecipeType>(false); */
	const [selectedIngredients] = useState<string[]>([]);
	const {main, loadRecipes} = useCombinedStore();
	const abortController = useRef(new AbortController());

	const generate = useCallback(async () => {
		setLoading(true);
		setError(null)
		const currentRecipes: string[] = main.recipes.map((recipe: RecipeType) => recipe.name)
		try {
			const data: ApiResponse = await _create(currentRecipes, selectedIngredients, abortController.current.signal);
			if(data.status === 'ok'){
				if(data.data === 'An error occured on chatcompletion'){
					setError('An error occured. Please try again later.')
					setLoading(false);
					return;
				}
				const recipes = JSON.parse(data.data);
				loadRecipes(recipes);
				setShowRecipes(true)
			}else{
				console.log(data);
			}
		} catch (e) {
			if ((e as Error).name !== 'AbortError') {
				setError('An error occured. Please try again.');
			}
		}
		setLoading(false);
	}, [setLoading, setError, loadRecipes, setShowRecipes, main.recipes, selectedIngredients])

	return (
		<div>
			<button className="ingredientsActions" disabled={loading}>
				{ loading && <span className="loader__secondary"></span>}
				{!loading && <span className="material-icons">tune</span>}
			</button>
			<button className="generate" onClick={generate} disabled={loading}>
				<Lottie
					loop={loading}
					animationData={cookAnimation}
					play
					style={{ width: 120, height: 120}}
				/>
			</button>
			{showRecipes && <Recipes error={error} cancel={setShowRecipes} regenerate={generate} loading={loading} />}
		</div>
	)
}

export default Generate