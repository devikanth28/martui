export const SET_TOKEN_VALIDATE = "SET_TOKEN_VALIDATE";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_TOKEN_VALIDATE:
            return {
                ...state,
                isValidToken: action.data
            };
        default:
            return state;
    }
}