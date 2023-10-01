import { useState, useCallback, useRef, useMemo } from 'react'
/* import Lottie from 'react-lottie-player'
import creatingAnimation from '../assets/animations/creating.json';
import errorAnimation from '../assets/animations/error.json';
import { Link } from'react-router-dom'; */
import cookAnimation from '../assets/animations/cook.json';
import Lottie from 'react-lottie-player';
import { _create } from '../api/createApi';
import { InventoryItem, Recipe as RecipeType } from '../types';
/* import Recipe from './Recipe';
import InstructionsModal from './Create/InstructionsModal'; */
import IngredientsModal from '../pages/Create/IngredientsModal';
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
	const [showRecipes, setShowRecipes] = useState<boolean>(false);
	const [showIngredients, setShowIngredients] = useState<boolean>(false);
	const {main, inventory, loadRecipes} = useCombinedStore();
	const abortController = useRef(new AbortController());
	const selectedIngredients: string[] = useMemo(() => {
		let out:string[] = [];
		inventory.forEach((item: InventoryItem) =>{
			if(item.selected) out.push(item.title);
		})
		return out;
	}, [inventory]);
	
	const mapRecipes = (recipes: RecipeType[]): Promise<RecipeType[]>  => {
		return new Promise(async (resolve, reject) => {
			const promises: Promise<any>[] = recipes.map(recipe => fetch('/mealdb/latest.php?s=' + encodeURIComponent(recipe.name))
			.then( response => response.json()));
			const results: any[] = await Promise.all(promises);
			if(!results){
				return resolve(recipes);
			};
			results.forEach((req, idx) => {
				console.log(req);
				if(req.meals){
					recipes[idx]['image'] = req.meals[0]['strMealThumb'];
				}
			})
			resolve(recipes);
		})
	}

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
					setShowRecipes(true);
					return;
				}
				const recipes: RecipeType[] = await mapRecipes(JSON.parse(data.data));
				if(!recipes) return;
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
			{main.recipes.length > 0 && 
				<button className="ingredientsHistory animate__animated animate__bounceIn" disabled={loading} onClick={() => setShowRecipes(true)}>
					<span className="material-icons">history_toggle_off</span>
				</button>
			}
			<button className="ingredientsActions animate__animated animate__bounceIn" disabled={loading} onClick={() => setShowIngredients(true)}>
				{ loading && <span className="loader__secondary"></span>}
				{!loading && <span className="material-icons">tune</span>}
				<span className="ingredientsActions__count">
					{selectedIngredients.length}
				</span>
			</button>
			<button className="generate animate__animated animate__bounceIn" onClick={generate} disabled={loading}>
				<Lottie
					loop={loading}
					animationData={cookAnimation}
					play
					style={{ width: 120, height: 120}}
				/>
			</button>
			{showRecipes && <Recipes setError={setError} error={error} cancel={setShowRecipes} regenerate={generate} loading={loading} />}
			{showIngredients && <IngredientsModal setModal={setShowIngredients}/>}
		</div>
	)
}

export default Generate