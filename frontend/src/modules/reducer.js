const initialState = {
    currentUser: null,
    error: null,
}
const FAILED = "FAILED";
const LOGIN = "STORE_TOKEN";
const LOGOUT = "REMOVE_TOKEN";

export default function (state = initialState, action){
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
    }
    return state;
}

export function login(username, password){
    return async (dispatch, getState)=>{
        const res = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`)
        let data = await res.json();
        if (!res.ok){
            return dispatch({type: FAILED, data: data.message});
        }
        dispatch({type: LOGIN, data});
    }
}

export function logout(){
    return async (dispatch, getState)=>{
        let currentUser = getState().currentUser;
        const res = await fetch(`http://localhost:8080/logout?currentUser=${currentUser}`)
        if( !res.ok){
            let data = await res.json();
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch({type: LOGOUT})
    }
}