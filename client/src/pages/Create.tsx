import { useEffect, useState, useCallback, useRef } from 'react'
import Lottie from 'react-lottie-player'
import creatingAnimation from '../assets/animations/creating.json';
import errorAnimation from '../assets/animations/error.json';
import { useGlobalState } from '../context/GlobalState';
import { Link } from'react-router-dom';
import { create } from '../api/createApi';
import { bookmark } from '../api/bookmarksApi';
import { Recipe as RecipeType } from '../types';
import Recipe from './Recipe';
import IngredientsModal from './Create/IngredientsModal';
import InstructionsModal from './Create/InstructionsModal';

type ApiResponse = {
	status: 'ok' | 'error',
	data: string
}
function Create() {
	console.log('component rerendered...')
	const {state, dispatch} = useGlobalState();
	const [error, setError] = useState<null | string>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [ingredientsModal, setIngredientsModal] = useState<boolean>(false);
	const [instructionsModal, setInstructionsModal] = useState<boolean | RecipeType>(false);
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
	const {main, inventory} = state;
	const abortController = useRef(new AbortController());

	const get = useCallback(async () => {
		setLoading(true);
		setError(null)
		const currentRecipes: string[] = main.recipes.map((recipe: RecipeType) => recipe.name)
		try {
			const data: ApiResponse = await create(currentRecipes, selectedIngredients, abortController.current.signal);
			if(data.status === 'ok'){
				if(data.data === 'An error occured on chatcompletion'){
					setError('An error occured. Please try again later.')
					setLoading(false);
					return;
				}
				const recipes = JSON.parse(JSON.stringify(data.data));
				dispatch({
                    type: 'RECIPES_SET',
                    payload: recipes
                });
			}else{
				console.log(data);
			}
		} catch (e) {
			if ((e as Error).name !== 'AbortError') {
				setError('An error occured. Please try again.');
			}
		}
		setLoading(false);
	}, [selectedIngredients, abortController, main.recipes, dispatch])
	const getMessage = () => {
		const randomMessage = Math.floor(Math.random() * 9) + 0;
		const messages = [
			"Oops! Looks like your kitchen's secret ingredient is 'mystery food.' Time to get creative, chef!",
			"Did someone say 'kitchen adventure'? Let's see what culinary masterpiece we can whip up with your ingredients!",
			"You've got the ingredients; we've got the magic. Get ready for a taste explosion!",
			"Breaking news: Your kitchen is officially a 5-star restaurant. Let's cook up some deliciousness!",
			"When life gives you ingredients, make a recipe app! Let's get cooking!",
			"Warning: Your ingredients are about to become the stars of tonight's dinner show!",
			"Your kitchen is a treasure trove, and we're here to help you unlock its flavor potential!",
			"Time to turn those everyday ingredients into a gourmet masterpiece. Ready, set, cook!",
			"Einstein had E=mc²; we have E=Your Ingredients². Let's create some delicious science!",
			"Your ingredients have gathered for a party in your kitchen. Let's be the hosts and make it epic!"
		];
		return messages[randomMessage];
	}
	const bookmarkMe = async (recipe:RecipeType, idx:number) => {
		try {
			const bookmarked = await bookmark(recipe)
			if(bookmarked.status === 'ok'){
				dispatch({type: 'RECIPES_BOOKMARK', payload: idx})
			}else{
				throw new Error('Could not bookmark');
			}
		} catch (error) {
			console.error(error);
		}
		
	}
	const canViewList = ():boolean => {
		return !loading && main.recipes.length > 0 && !error
	}
	useEffect(() => {
		if((main?.recipes.length === 0)){
			if(abortController.current){
				abortController.current.abort();
				abortController.current = new AbortController();
			}
			get();
		}
	}, [])
	return (
		<div className="page create">
			<div className="create__actions">
				<button className="btn btn__inverted btn__md btn__50" disabled={loading} onClick={() => setIngredientsModal(true)}>
					<span className="material-icons mright--5">library_add_check</span>
					Ingredients ({selectedIngredients.length})
				</button>
				<button className="btn btn__primary btn__md text__normal btn__50" onClick={get} disabled={loading}>
					{ loading && <span className="loader__secondary mright--10"></span>}
					{!loading && 
						<>
							Suggest again
							<span className="material-icons mleft--5">send</span>
						</>
					}
				</button>
			</div>
			<div className="page__header">
				<Link to="/" className="btn btn__secondary btn__md">
					<span className="material-icons">
						keyboard_arrow_left
					</span>
					Back
				</Link>
			</div>
			{ loading && 
				<div className="text__center">
					<div>
						<Lottie
							loop
							animationData={creatingAnimation}
							play
							style={{ width: 350, height: 350, margin: 'auto' }}
						/>
					</div>
					<div>
						<h3>Creating recipes...</h3>
						<h5 className="text__muted">{getMessage()}</h5>
					</div>
				</div>
			}
			{ (error && !loading) && 
				<div className="text__center">
					<div>
						<Lottie
							loop
							animationData={errorAnimation}
							play
							style={{ width: 350, height: 350, margin: 'auto' }}
						/>
					</div>
					<div>
						<h3>An error occured...</h3>
						<h5 className="text__muted">{error}</h5>
					</div>
				</div>
			}
			{ canViewList() && 
				<>
					{main?.recipes?.map((recipe: RecipeType, idx:number) => {
						return (
							<div className="card card__bordered">
								<Recipe recipe={recipe} idx={idx} showIngredients={true} />
								<div className="flex flex__row">
									<button className="btn btn__primary-soft btn__md text__normal" onClick={() => setInstructionsModal(recipe)}>
										<span className="material-icons">local_dining</span>
										View Instructions
									</button>
									{!recipe?.bookmarked &&
										<button className="btn btn__secondary  btn__md text__normal" onClick={() => bookmarkMe(recipe, idx)}>
											<span className="material-icons">bookmark_border</span>
										</button>
									}
								</div>
							</div>
						)
						
					})}
				</>
			}
			{ ingredientsModal && <IngredientsModal 
				inventory={inventory}
				dispatch={dispatch}
				cancel={setIngredientsModal}
				selectedIngredients={selectedIngredients}
				setSelectedIngredients={setSelectedIngredients}
			/>}
			{ instructionsModal && <InstructionsModal 
				data={instructionsModal}
				cancel={setInstructionsModal}
			/>}
		</div>
	)
}

export default Create