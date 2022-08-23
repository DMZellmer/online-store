const initialState = {
    currentUser: null,
}
const LOGIN_FAILED = "LOGIN_FAILED";
const STORE_TOKEN = "STORE_TOKEN";

export default function (state = initialState, action){
    switch (action.type) {
        case STORE_TOKEN: {
            return {...state, currentUser: action.data}
        }
        case LOGIN_FAILED: {

        }
    }
    return state
}

export function login(username, password){
    return async (dispatch, getState)=>{
        const response = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`)

        if (response.statusCode > 200){
            dispatch(LOGIN_FAILED);
        }
        let data = await response.text();
        dispatch({type: STORE_TOKEN, data});
    }
}