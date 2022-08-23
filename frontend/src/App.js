import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getHello, login} from "./modules/reducer";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useState} from "react";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
    let currentUser = useSelector(state => state.currentUser);

    if (currentUser) {
        return (
            <>
                <p>You are now logged into The Store</p>
                <Logout></Logout>

            </>
        );
    } else {
        return <>

            <Login></Login>
        </>
    }
}

export default App;
