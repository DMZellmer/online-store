
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getHello, login} from "./modules/reducer";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useState} from "react";

function App() {
    let dispatch = useDispatch();
    let currentUser = useSelector(state => state.currentUser);
    let error = useSelector(state => state.error);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    function handleSubmit(event){
    event.preventDefault();
    dispatch(login(username, password))
    }

    if(currentUser){
       return (<p>You're logged into The Store</p>)
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

export default App;
