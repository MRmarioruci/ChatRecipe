import {create} from 'zustand';
import { InventoryItem, Recipe } from './types';

type InventoryEditType = { id: number, key: string, value: string}
interface UserStoreType{
	user: { email: string, image: string | null} | null;
	loadUser: (payload: any) => void
}
interface InventoryStoreType{
	inventory: InventoryItem[] | [];
	loadInventory: (payload: InventoryItem[]) => void;
	addInventoryItem: (payload: InventoryItem) => void;
	editInventoryItem: (payload: InventoryEditType) => void;
	deleteInventoryItem: (payload: number) => void;
}
interface MainStoreType{
	main: {
		recipes: Recipe[];
	};
	loadRecipes: (payload: Recipe[]) => void;
}

/* Stores */
const userStore = create<UserStoreType>((set) => ({
	user: null,
	loadUser: (payload:any) => set((state) => ({ user: payload })),
}));
const inventoryStore = create<InventoryStoreType>((set) => ({
	inventory: [],
	loadInventory: (payload: InventoryItem[]) => set({ inventory: payload }),
	addInventoryItem: (payload: InventoryItem) => set((state) => (
		{ ...state, inventory: [...state.inventory, ...[payload]]}
	)),
	editInventoryItem: (payload: InventoryEditType) =>
		set((state) => ({
			inventory: state.inventory.map((item) =>{
				return item.id === payload.id ? { ...item, [payload.key]: payload.value } : item
			}),
		})),
	deleteInventoryItem: (payload: number) => set((state) => ({ inventory: state.inventory.filter((item) => item.id !== payload) })),
}));
const mainStore = create<MainStoreType>((set) => ({
	main: {
		recipes: []
	},
	loadRecipes: (payload: Recipe[]) => {
		set((state) => ({
			main: {
				recipes: [...state.main.recipes, ...payload]
			}
		}));
	}
}));

const useCombinedStore = () => {
	return {
		...userStore(),
		...inventoryStore(),
		...mainStore()
	};
};

export default useCombinedStore;
