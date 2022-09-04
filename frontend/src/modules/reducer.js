const initialState = {
    currentUser: null,
    error: null,
    isOwner: false,
    users: [],
    products: [],
    prodSelection: null,
    userSelection: null,
}
export const FAILED = "FAILED";
export const LOGIN = "STORE_TOKEN";
export const LOGOUT = "REMOVE_TOKEN";
export const SIGNUP = "SIGNUP";
export const CREATE_USER = "CREATE_USER";
export const STORE_PRODUCTS = "STORE_PRODUCTS";
export const STORE_USERS = "STORE_USERS";
export const SHOW_USERS = "SHOW_USERS";
export const SHOW_PRODUCTS = "SHOW_PRODUCTS";
export const CLEAR_SELECTION = "CLEAR_SELECTION";
export const CLEAR_USER_SELECTION = "CLEAR_USER_SELECTION";

export default function (state = initialState, action) {
    state.error = null;
    switch (action.type) {
        case LOGIN: {
            return {...state, currentUser: action.data}
        }
        case FAILED: {
            return {...state, error: action.data}
        }
        case LOGOUT: {
            return {...state, currentUser: null}
        }
        case SIGNUP: {
            return {...state, currentUser: action.data}
        }
        case CREATE_USER: {
            return {...state, currentUser: action.data, owner: action.data}
        }
        case STORE_USERS: {
            return {...state, users: action.data}
        }
        case STORE_PRODUCTS: {
            return {...state, products: action.data}
        }
        case SHOW_USERS: {
            return {...state, userSelection: state.users.find(u => u.id == action.data)}
        }
        case SHOW_PRODUCTS: {
            return {...state, prodSelection: state.products.find(p => p.id == action.data)}
        }
        case CLEAR_SELECTION: {
            return {...state, prodSelection: null}
        }
        case CLEAR_USER_SELECTION: {
            return {...state, userSelection: null}
        }
    }
    return state;
}




