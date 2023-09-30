import { useState } from 'react'
import Lottie from 'react-lottie-player'
import errorAnimation from '../assets/animations/error.json';
import { _bookmark } from '../api/bookmarksApi';
import { Recipe as RecipeType } from '../types';
import Recipe from './Recipe';
import useCombinedStore from '../State';

type PropTypes = {
	cancel: React.Dispatch<React.SetStateAction<boolean>>,
	error: null | string,
	regenerate: () => Promise<void> ,
	loading: boolean
}
function Recipes({cancel, error, regenerate, loading}: PropTypes) {
	const [instructions, setInstructions] = useState<null | RecipeType>(null);
	const {main} = useCombinedStore();

	const bookmarkMe = async (recipe:RecipeType, idx: number) => {
		try {
			const bookmarked = await _bookmark(recipe)
			if(bookmarked.status === 'ok'){
				/*  */
			}else{
				throw new Error('Could not bookmark');
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="modal__overlay active modal__cheatsheet">
			<div className="modal active animate__animated animate__zoomIn modal__md">
				<div className="modal__header">
					<div className="modal__header-title">
						{instructions &&
							<button className="btn btn__transparent text__primary btn__sm" style={{marginTop: '5px'}} onClick={() => setInstructions(null)}>
								<span className="material-icons font__35">
									arrow_back_ios
								</span>
							</button>
						}
					</div>
					<div className="close-modal modal__x">
						<svg viewBox="0 0 20 20" onClick={() => { cancel(false) }}>
							<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>
					</div>
				</div>
				<div className="modal__content">
					<div className="modal__body">
						{ error && 
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
						{!instructions &&
							<div>
								{main.recipes.map((recipe: RecipeType, idx:number) => {
									return (
										<div className="card card__bordered">
											<Recipe recipe={recipe} idx={idx} showIngredients={true} />
											<div className="flex flex__row">
												<button className="btn btn__primary-soft btn__md text__normal" onClick={() => setInstructions(recipe)}>
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
							</div>
						}
						{instructions &&
							<div>
								<h4>{instructions.name}</h4>
								<div className="mtop--30">
									<div>{instructions.description}</div>
									<div>
										<b>Ingredients</b>
										<div dangerouslySetInnerHTML={{ __html: instructions?.ingredients }}></div>
									</div>
									<div>
										<b>Execution</b>
										<div dangerouslySetInnerHTML={{ __html: instructions?.execution }}></div>
									</div>
								</div>
							</div>
						}
					</div>
					<div className="modal__footer text__right">
						<button className="btn btn__primary" onClick={regenerate} disabled={loading}>
							{loading ? 'Generating...' : 'Generate more...'}
						</button>
					</div>
				</div>
			</div>
		</div>		
	)
}

export default Recipes