const initialState = {
    currentUser: null,
    error: null,
    isOwner: false,
    users: [],
    products: [],
    prodSelection: null,
    userSelection: null,
}
const FAILED = "FAILED";
const LOGIN = "STORE_TOKEN";
const LOGOUT = "REMOVE_TOKEN";
const SIGNUP = "SIGNUP";
const CREATE_USER = "CREATE_USER";
const STORE_PRODUCTS = "STORE_PRODUCTS";
const STORE_USERS = "STORE_USERS";
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
        console.log(user)
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
export function createProduct(name, price) {
    return async (dispatch, getState) => {
        let currentUser = getState().currentUser
        const res = await fetch(
            `http://localhost:8080/createProduct?currentUser=${currentUser}&name=${name}&price=${price}`)
        let data = await res.text()

        if (!res.ok) {
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch(getProductList())
    }
}
export function getProductList() {
    return async (dispatch, getState) => {
        const res = await fetch("http://localhost:8080/getProductList")
        const data = await res.json();
        dispatch({type: STORE_PRODUCTS, data})
    }
}
export function editProductList(name, price) {
    return async (dispatch, getState) => {
        let currentUser = getState().currentUser;
        let prod = getState().prodSelection;
        prod.name = name ? name : prod.name;
        prod.price = price ? price : prod.price;
        const res = await fetch(
            `http://localhost:8080/editProductList?currentUser=${currentUser}`,{
                method: "POST",
                body: JSON.stringify(prod),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if (!res.ok) {
            const data = await res.json();
            console.log(prod)
            return dispatch ({type: FAILED, data: data.message})
        }
        dispatch(getProductList())
    }
}

export function deleteProduct() {
    return async (dispatch, getState) => {
        let currentUser = getState().currentUser;
        let prod = getState().prodSelection;
        const res = await fetch(
            `http://localhost:8080/deleteProductList?currentUser=${currentUser}&id=${prod.id}`,{
                method: "DELETE",
            })
        if (!res.ok) {
            const data = await res.json();
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch(getProductList())
    }
}
