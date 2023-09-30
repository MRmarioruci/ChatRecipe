import React, {useCallback, useEffect} from 'react'
import { StateAction, InventoryItem } from '../../types';
import Lottie from 'react-lottie-player';
import { _getInventory } from '../../api/inventoryApi';
import inventoryAnimation from '../../assets/animations/inventory.json';

type PropTypes = {
    inventory: InventoryItem[];
	dispatch: React.Dispatch<StateAction>;
	cancel: React.Dispatch<React.SetStateAction<boolean>>;
	selectedIngredients: string[];
	setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

function IngredientsModal({inventory, dispatch, cancel, selectedIngredients, setSelectedIngredients}: PropTypes) {
    const get = useCallback(async () => {
		try {
			const data = await _getInventory();
			if(data.status === 'ok'){
				dispatch({
                    type: 'INVENTORY_SET',
                    payload: data.data
                })
			}
		} catch (error) {
			console.log(error);
		}
	}, [dispatch])

	const toggleIngredient = (newValue:boolean, ingredientTitle:string) => {
		if(newValue){
			setSelectedIngredients((currentIngredients) => {
				return [...currentIngredients, ingredientTitle]
			})
		}else{
			setSelectedIngredients((currentIngredients) => {
				return currentIngredients.filter((ingredient) => ingredient !== ingredientTitle)
			})
		}
	}
	const ingredientIsChecked = (ingredientTitle:string) => {
		return selectedIngredients.includes(ingredientTitle);
	}

	useEffect(() => {
		if(inventory.length === 0) get();
	}, [inventory, get])

	return (
		<div className="modal__overlay active modal__cheatsheet">
			<div className="modal active animate__animated animate__zoomIn modal__md">
				<div className="modal__header">
					<div className="modal__header-title">
						Choose your ingredients
					</div>
					<div className="close-modal modal__x">
						<svg viewBox="0 0 20 20" onClick={() => { cancel(false) }}>
							<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>
					</div>
				</div>
				<div className="modal__content">
					<div className="modal__body">
						{inventory.map((ingredient, idx) => {
							return (
								<div key={`ingredient__${idx}`} className="form__group">
									<input type="checkbox" checked={ingredientIsChecked(ingredient.title)} onChange={(e) => toggleIngredient(e.target.checked, ingredient.title)}/>
									<label>{ingredient.title}</label>
								</div>
							)
						})}
						{inventory.length === 0 && 
							<div className="text__center">
								<Lottie
									loop
									animationData={inventoryAnimation}
									play
									style={{ width: 150, height: 150, margin: 'auto' }}
								/>
								<h3>Nothing in your inventory</h3>
							</div>
						}
					</div>
					<div className="modal__footer text__right">
						<button className="btn btn__primary" onClick={() => { cancel(false) }}>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IngredientsModal