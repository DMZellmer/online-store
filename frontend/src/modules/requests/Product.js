import {FAILED, STORE_PRODUCTS} from "../reducer";
const baseUrl = "http://localhost:8083"

export function createProduct(name, price) {
    return async (dispatch, getState) => {
        let currentUser = getState().currentUser
        const res = await fetch(
            {baseUrl}`/createProduct?currentUser=${currentUser}&name=${name}&price=${price}`)
        let data = await res.json()

        if (!res.ok) {
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch(getProductList())
    }
}
export function getProductList() {
    return async (dispatch) => {
        const res = await fetch("http://localhost:8083/getProductList")
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
            `http://localhost:8083/editProductList?currentUser=${currentUser}`,{
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
            `http://localhost:8083/deleteProductList?currentUser=${currentUser}&id=${prod.id}`,{
                method: "DELETE",
            })
        if (!res.ok) {
            const data = await res.json();
            return dispatch({type: FAILED, data: data.message})
        }
        dispatch(getProductList())
    }
}
