import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

export function ProductDetails(){
    const dispatch = useDispatch();
    let product = useSelector(state => state.prodSelection)
    let currentUser = useSelector(state => state.currentUser)
    let [editing, setEditing] = useState(false)
    let [name, setName]= useState(product? product.name : "")
    let [price, setPrice]= useState(product? product.price : "")
    let [inventory, setInventory]= useState(product? product.inventory : "")

    function handleSubmit(){
        dispatch(name, price, inventory)
        onClose()
    }
    function onClose(){
        setEditing(false)
        setName("")
        setPrice("")
        setInventory("")
    }

}