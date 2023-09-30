type UserState = any
type UserAction = any
const userReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case 'USER_SET':
            return {...state, ...action.payload};
        default:
            return state;
    }
}
export default userReducer