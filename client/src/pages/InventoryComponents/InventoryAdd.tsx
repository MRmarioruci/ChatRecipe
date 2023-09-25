import React, {useState, useCallback} from 'react'
import { addInventoryItem } from '../../api/inventoryApi';
import { StateAction } from '../../types';

type PropTypes = {
	dispatch: React.Dispatch<StateAction>,
	cancel: React.Dispatch<React.SetStateAction<boolean>>
}
function InventoryAdd({dispatch, cancel}: PropTypes) {
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const addItem = useCallback(async () => {
		const data = await addInventoryItem(title, description);
		if(data.status === 'ok'){
			dispatch({ type: 'INVENTORY_ADD', payload: data.data})
			cancel(false);
		}
	}, [title, description])
	return (
		<div className="modal__overlay active modal__cheatsheet">
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
								<input type="text" placeholder="E.g: Potatoes" value={title} onChange={e => setTitle(e.target.value)} />
								<span className="focus"></span>
							</div>
						</div>
						<div className="form__group">
							<label>Description</label>
							<div className="input__wrap">
								<textarea style={{minHeight: '150px'}} value={description} onChange={e => setDescription(e.target.value)} placeholder="Extra information, e.g: 1kg"></textarea>
								<span className="focus"></span>
							</div>
						</div>
					</div>
					<div className="modal__footer text__right">
						<button className="btn btn__secondary">
							Cancel
						</button>
						<button className="btn btn__primary" disabled={!title} onClick={addItem}>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InventoryAdd