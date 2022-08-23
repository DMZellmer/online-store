const initialState = {
    currentUser: null,
    error: null,
}
const FAILED = "FAILED";
const STORE_TOKEN = "STORE_TOKEN";

export default function (state = initialState, action){
    switch (action.type) {
        case STORE_TOKEN: {
            return {...state, currentUser: action.data}
        }
        case FAILED: {
            return {...state, error: action.data}
        }
    }
    return state
}

export function login(username, password){
    return async (dispatch, getState)=>{
        const res = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`)
        let data = await res.json();
        if (!res.ok){
            return dispatch({type: FAILED, data: data.message});
        }
        dispatch({type: STORE_TOKEN, data});
    }
}