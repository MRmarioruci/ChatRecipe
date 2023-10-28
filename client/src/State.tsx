import {create} from 'zustand';
import { InventoryItem, Recipe } from './types';

type InventoryEditType = { id: number, key: string, value: string | boolean}
interface UserStoreType{
	user: { email: string, picture: string | null} | null;
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
	updateRecipe: (id: number | undefined, data: Recipe) => void;
}
interface BookmarksStoreType{
	bookmarks: [] | Recipe[];
	addBookmark: (bookmark: Recipe) => void;
	deleteBookmark: (id: number) => void;
	loadBookmarks: (bookmarks: Recipe[]) => void
}
/* 
	Individual Stores
*/
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
const bookmarksStore = create<BookmarksStoreType>((set) => ({
	bookmarks: [],
	loadBookmarks: (bookmarks: Recipe[]) => set({ bookmarks: bookmarks }),
	addBookmark: (bookmark: Recipe) => set((state) => (
		{ ...state, bookmarks: [...state.bookmarks, ...[bookmark]]}
	)),
	deleteBookmark: (id: number) => set((state) => ({ bookmarks: state.bookmarks.filter((item) => {
		console.log(item.id, id);
		return item.id !== id
	}) })),
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
	},
	updateRecipe: (id: number | undefined, data: Recipe) => set((state) => ({
		main: {
			...state.main,
			recipes: state.main.recipes.map((recipe) => {
				return recipe.id === id ? {...data} : {...recipe}
			})
		}
	}))
}));

/* 
	Combine Stores
*/
const useCombinedStore = () => {
	return {
		...userStore(),
		...inventoryStore(),
		...mainStore(),
		...bookmarksStore()
	};
};

export default useCombinedStore;
