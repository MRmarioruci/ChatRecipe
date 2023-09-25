import React, { createContext, useReducer, useContext } from 'react';
import rootReducer from './reducers/index';
import { ContextType } from '../types/index';

const GlobalStateContext = createContext<ContextType>(null);

// Initial state
const initialState = {
    user: {},
    inventory: [],
    bookmarks: [],
    main: {
        recipes: [],
        user: '',
        selectedRecipe: null,
    }
};

// Create the context provider
export const GlobalStateProvider = ({ children }: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
    
// Custom hook to access the global state
export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};