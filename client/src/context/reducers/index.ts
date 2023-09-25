import userReducer from './userReducer';
import inventoryReducer from './inventoryReducer';
import bookmarksReducer from './bookmarksReducer';
import mainReducer from './mainReducer';
import { StateType, StateAction } from '../../types';

const rootReducer = (state: StateType, action: StateAction) => {
    return {
        user: userReducer(state.user, action),
        inventory: inventoryReducer(state.inventory, action),
        bookmarks: bookmarksReducer(state.bookmarks, action),
        main: mainReducer(state.main, action), // Use 'main' here, not 'mainReducer'
    };
};

export default rootReducer;
