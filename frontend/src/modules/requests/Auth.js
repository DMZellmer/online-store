import {FAILED, LOGIN, LOGOUT} from "../reducer";
import {getUserList} from "./User";


export function login(username, password) {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`)
        let data = await res.json();
        if (!res.ok) {
            return dispatch({type: FAILED, data: data.message});
        }
        dispatch({type: LOGIN, data});
        dispatch(getUserList());
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
        const res = await fetch(`http://localhost:8080/signup?username=${username}&password=${password}&isOwner=${isOwner}`)
        if (!res.ok) {
            let data = await res.json()
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch(getUserList())
    }
}