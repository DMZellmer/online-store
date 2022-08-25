const initialState = {
    currentUser: null,
    error: null,
    isOwner: false,
}
const FAILED = "FAILED";
const LOGIN = "STORE_TOKEN";
const LOGOUT = "REMOVE_TOKEN";
const SIGNUP = "SIGNUP";
const CREATE_USER = "CREATE_USER";
const STORE_USERS = "STORE_USERS";
export const SHOW_USERS = "SHOW_USERS";

export default function (state = initialState, action) {
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
    }
    return state;
}

export function login(username, password) {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`)
        let data = await res.json();
        if (!res.ok) {
            return dispatch({type: FAILED, data: data.message});
        }
        dispatch({type: LOGIN, data});
        // dispatch(getUserList());
    }
}

export function logout() {
    return async (dispatch, getState) => {
        let currentUser = getState().currentUser;
        const res = await fetch(`http://localhost:8080/logout?currentUser=${currentUser}`)
        if (!res.ok) {
            let data = await res.json();
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch({type: LOGOUT})
    }
}

export function signup(username, password, isOwner) {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:8080/signup?username=${username}&password=${password}`)
        let data = await res.json()
        if (!res.ok) {
            return dispatch({type: FAILED, data: data.message})
        }
        // dispatch(getUserList())
    }
}

export function createUser(username, password, isOwner) {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:8080/createUser?username=${username}&password=${password}&isOwner=${isOwner}`)
        let data = await res.text()
        if (!res.ok) {
            return dispatch({type: FAILED, data: data.message})
        }
        // dispatch(getUserList())
    }
}

export function getUserList() {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:8080/userList`)
        const data = await res.json();
        dispatch({type: STORE_USERS, data})
    }
}