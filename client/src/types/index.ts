export type ContextType = { state: StateType; dispatch: React.Dispatch<StateAction> } | null;
export interface InventoryItem{
    id: number;
    title: string;
    description: string;
    image?: string;
    price?: number;
    stock?: number;
    color?: string;
    selected?: boolean;
}
export interface StateType{
    user: any;
    inventory: InventoryItem[];
    bookmarks: Recipe[];
    main: MainState;
}
export interface StateAction{
    type: string;
    payload: any;
}

export interface Recipe{
    id?:number;
    name: string;
    description: string;
    execution: string;
    ingredients: string | TrustedHTML;
    bookmarked?: boolean;
    image?: string;
    youtube?: string;
}
export interface MainState{
    selectedRecipe: Recipe | null;
    recipes: Recipe[];
}