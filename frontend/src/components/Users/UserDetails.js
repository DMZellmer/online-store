import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {CLEAR_USER_SELECTION} from "../../modules/reducer";
import {deleteUser} from "../../modules/requests";
import {Button, ButtonGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";

export function UserDetails() {
    const dispatch = useDispatch();
    let user = useSelector(state => state.userSelection)
    let [editing, setEditing] = useState(false)
    let [username, setUsername] = useState(user ? user.username : "")
    let [isOwner, setIsOwner] = useState(user ? user.isOwner : false)

    function onClose() {
        setEditing(false)
        setUsername("")
        setIsOwner(false)
        dispatch({type: CLEAR_USER_SELECTION});
    }

    function onDelete() {
        dispatch(deleteUser());
        onClose();
    }

    return (
        <>
            <Modal show={!!user}>
                <ModalHeader>
                    <FormLabel>User:</FormLabel>
                    {" "}{user?.username}<br/>
                </ModalHeader>
                <ModalBody>
                    <label>Owner:</label>
                    {" "}{user?.isOwner.toString()}
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                    <Button
                        variant={"outline-danger"}
                        onClick={() => onDelete()}
                        >Delete</Button>
                    <Button
                        variant={"outline-dark"}
                        onClick={() => onClose()}
                        >Close</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        </>
    )
}