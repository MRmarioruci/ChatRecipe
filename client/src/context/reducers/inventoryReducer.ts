import {InventoryItem, StateAction} from '../../types/index';

type InventoryState = InventoryItem[];   

const inventoryReducer = (state: InventoryState, action: StateAction) => {
    switch (action.type) {
        case 'INVENTORY_SET':
            return [...action.payload];
        case 'INVENTORY_ADD':
            return [...state, ...[action.payload] ];
        case 'INVENTORY_DELETE':
            return state.filter(item => item.id !== action.payload);
        case 'INVENTORY_EDIT':
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        [action.payload.key]: action.payload.value,
                    };
                }
                return item;
            });
        default:
            return state;
    }
}
export default inventoryReducer