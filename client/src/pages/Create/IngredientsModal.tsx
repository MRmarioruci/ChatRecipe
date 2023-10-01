import React, {useCallback, useEffect} from 'react'
import Lottie from 'react-lottie-player';
import { _getInventory } from '../../api/inventoryApi';
import inventoryAnimation from '../../assets/animations/inventory.json';
import useCombinedStore from '../../State';
type PropTypes = {
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function IngredientsModal({setModal}: PropTypes) {
	const {inventory, loadInventory, editInventoryItem} = useCombinedStore();

	const get = useCallback(async () => {
		try {
			const data = await _getInventory();
			if(data.status === 'ok'){
				loadInventory(data.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, [loadInventory])

	const ingredientIsChecked = (id: number) => {
		const found = inventory.find( (item) => item.id === id);
		return found ? found.selected :  false
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
						<svg viewBox="0 0 20 20" onClick={() => { setModal(false) }}>
							<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>
					</div>
				</div>
				<div className="modal__content">
					<div className="modal__body">
						{inventory.map((ingredient, idx) => {
							return (
								<div key={`ingredient__${idx}`} className="form__group">
									<input type="checkbox" checked={ingredient.selected} onChange={(e) => editInventoryItem({id: ingredient.id, key: 'selected', value: e.target.checked})}/>
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
						<button className="btn btn__primary" onClick={() => { setModal(false) }}>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IngredientsModal