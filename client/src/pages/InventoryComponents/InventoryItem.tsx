import React, {useState, useCallback} from 'react'
import { InventoryItem as InventoryItemType, StateAction } from '../../types'
import { deleteInventoryItem } from '../../api/inventoryApi'
import InventoryEdit from './InventoryEdit'

type PropTypes = {
	item: InventoryItemType;
	dispatch: React.Dispatch<StateAction>,
}

function InventoryItem({item, dispatch}: PropTypes) {
	const [editModal, setEditModal] = useState<boolean>(false);
	const [deleteMode, setDeleteMode] = useState<boolean>(false);
	
	const deleteItem = useCallback(async () => {
		const data = await deleteInventoryItem(item.id)
		if(data.status === 'ok'){
			dispatch({
                type: 'INVENTORY_DELETE',
                payload: data.data,
            })
		}
	},[])
	return (
		<div className="inventory__item" style={{background: item?.color}}>
			<div className="inventory__item-icon">
				<img src="https://api.iconify.design/noto:pot-of-food.svg" width="60"/>
			</div>
			<div className="inventory__item-content">
				<div className="inventory__item-contentTop">
					<div className="text__bold font__16">{item.title}</div>
					<div className="text__muted inventory__item-contentDescription">
						{item.description}
					</div>
				</div>
				<div className="inventory__item-contentBottom">
					{deleteMode ?
						<div>
							Are you sure you want to delete this?
							<div className="mtop--10 flex flex__row justify--center">
								<button className="btn btn__secondary btn__md" onClick={() => setDeleteMode(false)}>Cancel</button>
								<button className="btn btn__danger btn__md" onClick={deleteItem}>Delete</button>
							</div>
						</div>
						:
						<>
							<div className="btn btn__transparent btn__sm" onClick={() => setEditModal(true)}>
								<span className="material-icons">edit</span>
							</div>
							<div className="btn btn__transparent btn__sm" onClick={() => setDeleteMode(!deleteMode)}>
								<span className="material-icons">clear</span>
							</div>
						</>
					}
				</div>
			</div>
			{ editModal && <InventoryEdit cancel={setEditModal} item={item} dispatch={dispatch}/>}
		</div>
	)
}

export default InventoryItem