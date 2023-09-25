import React, {useState, useCallback} from 'react'
import { InventoryItem as InventoryItemType, StateAction } from '../../types'
import { editInventoryItem } from '../../api/inventoryApi'

type PropTypes = {
	item: InventoryItemType;
	dispatch: React.Dispatch<StateAction>,
	cancel: React.Dispatch<React.SetStateAction<boolean>>;
}

function InventoryEdit({item, dispatch, cancel}: PropTypes) {
	const [title, setTitle] = useState<string>(item.title || '');
	const [description, setDescription] = useState<string>(item.description || '');

	const edit = useCallback(async (key: string, value: string) => {
		const data = await editInventoryItem(item.id, { [key]: value});
		if(data){
			dispatch({type: 'INVENTORY_EDIT', payload: data.data})
		}
	}, [])
	return (
		<div className="modal__overlay active">
			<div className="modal active animate__animated animate__zoomIn modal__md">
				<div className="modal__header">
					<div className="modal__header-title">
						Add an item
					</div>
					<div className="close-modal modal__x">
						<svg viewBox="0 0 20 20" onClick={() => { cancel(false) }}>
							<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>
					</div>
				</div>
				<div className="modal__content">
					<div className="modal__body">
						<div className="form__group">
							<label>Title</label>
							<div className="input__wrap">
								<input type="text" placeholder="E.g: Potatoes" value={title} onChange={e => setTitle(e.target.value)} onBlur={ e => edit('title', e.target.value)} />
								<span className="focus"></span>
							</div>
						</div>
						<div className="form__group">
							<label>Description</label>
							<div className="input__wrap">
							<textarea style={{minHeight: '150px'}} value={description} onChange={e => setDescription(e.target.value)} onBlur={ e => edit('description', e.target.value)} placeholder="Extra information, e.g: 1kg"></textarea>
								<span className="focus"></span>
							</div>
						</div>
					</div>
					<div className="modal__footer text__right">
						<button className="btn btn__primary">
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InventoryEdit