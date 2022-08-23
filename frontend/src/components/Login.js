import {login} from "../modules/reducer";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

export default () => {
    let dispatch = useDispatch();
    let error = useSelector(state => state.error);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    function handleSubmit(event){
        event.preventDefault();
        dispatch(login(username, password))
    }
    return (
        <>
            {error && error}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormControl type={"text"} placeholder={"username"} onChange={e=>setUsername(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl type={"password"} placeholder={"password"} onChange={e=>setPassword(e.target.value)}></FormControl>
                </FormGroup>
                <Button type={"submit"} variant={"primary"}>Login</Button>
            </Form>
        </>
    );
}