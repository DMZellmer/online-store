import {FAILED, STORE_USERS} from "../reducer";

export function createUser(username, password, isOwner) {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:8080/createUser?username=${username}&password=${password}&isOwner=${isOwner}`)
        let data = await res.text()
        if (!res.ok) {
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch(getUserList())
    }
}


export function getUserList() {
    return async (dispatch, getState) => {
        const res = await fetch(`http://localhost:8080/userList`)
        const data = await res.json();
        dispatch({type: STORE_USERS, data})
    }
}
export function edit(username, isOwner) {
    return async (dispatch, getState) => {
        let currentUser = getState().currentUser;
        let user = getState().userSelection;
        user.username = username ? username : user.name;
        user.isOwner = isOwner ? isOwner : user.isOwner;
        const res = await fetch(
            `http://localhost:8080/editUserList?currentUser=${currentUser}`,{
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if (!res.ok) {
            const data = await res.json();
            console.log(user)
            return dispatch ({type: FAILED, data: data.message})
        }
        dispatch(getUserList())
    }
}
export function deleteUser() {
    return async (dispatch, getState) => {
        let currentUser = getState().currentUser;
        let user = getState().userSelection;
        const res = await fetch(
            `http://localhost:8080/deleteUserList?currentUser=${currentUser}&id=${user.id}`,{
                method: "DELETE",
            })
        if (!res.ok) {
            const data = await res.json();
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch(getUserList())
    }
}