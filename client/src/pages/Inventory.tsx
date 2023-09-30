import { useEffect, useState, useCallback } from 'react'
import { Link } from'react-router-dom';
import { _getInventory } from '../api/inventoryApi';
import useCombinedStore from '../State';
import Lottie from 'react-lottie-player'
import inventoryAnimation from '../assets/animations/inventory.json';
import InventoryAdd from './InventoryComponents/InventoryAdd';
import InventoryItem from './InventoryComponents/InventoryItem';

function Inventory() {
	const {inventory, loadInventory} = useCombinedStore();
	const [addInventoryModal, setAddInventoryModal] = useState<boolean>(false);
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

	useEffect(() => {
		if(inventory.length === 0) get();
	}, [get, inventory])
	
	return (
		<div className="page inventory">
			<div className="page__header">
				<Link to="/" className="btn btn__secondary btn__md">
					<span className="material-icons">
						keyboard_arrow_left
					</span>
					Back
				</Link>
				<div>
					{inventory.length > 0 &&
						<button className="btn btn__inverted btn__md" onClick={() => setAddInventoryModal(true)}>
							<span className="material-icons">add</span>
							Add
						</button>
					}  
				</div>
			</div>
			{ inventory.length > 0 &&
				<div className="inventory__list">
					{inventory.map((item, index) => {
						return (
                            <InventoryItem key={`inventory__${index}`} item={item} />
                        )
					})}
				</div>
			}
			{ inventory.length === 0 &&
				<div className="text__center">
					<div className="lottie">
						<Lottie
							loop
							animationData={inventoryAnimation}
							play
							style={{ width: 350, height: 350, margin: 'auto' }}
						/>
					</div>
					<div>
						<h2>Inventory</h2>
						<h5 className="text__muted">Create a list of all the ingredients you have in your home. We will take care of the rest.</h5>
						<div className="btn btn__primary btn__rounded" onClick={() => setAddInventoryModal(true)}>
							<span className="material-icons">add</span>
							Add your first item
						</div>
					</div>
				</div>
			}
			{ addInventoryModal && <InventoryAdd cancel={setAddInventoryModal} />}
		</div>
	)
}

export default Inventory