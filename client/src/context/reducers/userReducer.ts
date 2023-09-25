type UserState = any
type UserAction = any
const userReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case 'A':
            return {...state, a: action.payload };
            break;
    
        default:
            return state;
    }
}
export default userReducer