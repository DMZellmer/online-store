import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {logout} from "../modules/requests";

export default () => {
    const dispatch = useDispatch();
    return (
        <>
            <Button onClick={e => {
                dispatch(logout())
            }}>Logout</Button>
        </>
    );
}