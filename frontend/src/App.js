import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getHello, login} from "./modules/reducer";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {useState} from "react";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import CreateUser from "./components/Users/CreateUser";
import UserList from "./components/Users/UserList";

function App() {
    let currentUser = useSelector(state => state.currentUser);
    let owner = useSelector(state => state.isOwner);

    if (currentUser) {
        return (
            <>
                <Row>
                    <p>You are now logged into The Store</p>
                    <Col md={2} className={""}>
                        <Logout/>
                    </Col>
                </Row><br/>
                <Container>
                    <Row>
                        <Col>
                            <h4> User List, Create a User</h4>
                            <UserList></UserList>
                            <CreateUser></CreateUser>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    } else {
        return (
            <>

                <Login></Login>
                <Signup></Signup>
            </>
        );
    }
}

export default App;
