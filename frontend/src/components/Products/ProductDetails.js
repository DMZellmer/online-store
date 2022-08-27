import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {deleteProduct} from "../../modules/reducer";
import {Button, Col, FormControl, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";

export function ProductDetails() {
    const dispatch = useDispatch();
    let product = useSelector(state => state.prodSelection)
    let currentUser = useSelector(state => state.currentUser)
    let [editing, setEditing] = useState(false)
    let [name, setName] = useState(product ? product.name : "")
    let [price, setPrice] = useState(product ? product.price : "")
    let [inventory, setInventory] = useState(product ? product.inventory : "")

    function onSubmit() {
        dispatch(name, price, inventory)
        onClose()
    }

    function onClose() {
        setEditing(false)
        setName("")
        setPrice("")
        setInventory("")
    }

    function onDelete() {
        dispatch(deleteProduct())
        onClose()

    }

    return (
        <>
            <Modal show={!!product}>
                <ModalHeader>
                    <h5> Product:{" "}
                        {editing ?
                            <FormControl
                                placeholder={product?.name}
                                value={name}
                                onChange={e => setName(e.target.value)}>
                            </FormControl>
                            : product?.name
                        }</h5>
                    <p> Inventory: {" "}{editing ?
                        <FormControl
                            type={"number"}
                            placeholder={product?.inventory}
                            value={inventory}
                            onChange={e => setInventory(e.target.value)}>
                        </FormControl>
                        : product?.inventory
                    }</p>
                </ModalHeader>
                <ModalBody>
                    <p> Price: ${" "}{
                        editing ?
                            <FormControl
                                type={"number"}
                                placeholder={product?.price}
                                value={price}
                                onChange={e => setPrice(e.target.value)}>
                            </FormControl>
                            : product?.price
                    }
                    </p>
                </ModalBody>
                <ModalFooter className={'d-flex justify-content-between'}>
                    <Col sm={2}>
                        <Button type={"button"} //disabled={isOwner}
                                >Add Product</Button>
                    </Col>
                    <Col sm={8}>
                        {editing ?
                        <Button
                            onClick={() => onSubmit()}
                            >Submit </Button>
                            :
                            <Button type={"button"}
                                    onClick={e => setEditing(true)}
                                    //disabled={!isOwner}
                            >Edit</Button>}
                        <Button
                            variant={"danger"}
                            onClick={() => onDelete()}
                            // disabled={!isOwner}
                            >Delete</Button>
                    </Col>
                </ModalFooter>
            </Modal>
        </>
    )
}