import {useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../modules/reducer";

export default ()=>{
    const isOwner = useSelector(state => state.isOwner)
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(event){
        event.preventDefault();
        dispatch(signup(username, password, isOwner))
    }

    return ( <>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <h3>Sign up here</h3>
                <FormLabel>Username</FormLabel>
                <FormControl type={"text"} placeholder={"username"}
                    onChange= {event => setUsername(event.target.value)}></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type={"password"} placeholder={"password"}
                    onChange= {event => setPassword(event.target.value)}></FormControl>
            </FormGroup>
            <Button type={"submit"} variant={"success"}>Sign Up</Button>
        </Form>
        </>)
}