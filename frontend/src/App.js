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
import CreateProduct from "./components/Products/CreateProduct";

export default function App() {
    let currentUser = useSelector(state => state.currentUser);
    let owner = useSelector(state => state.isOwner);
    let error = useSelector(state => state.error);
    let errorMessage = ""
    if (error) {
        errorMessage = <p>{error}</p>
    }

    if (currentUser) {
        return (
            <>
                {errorMessage}
                <Row>
                    <p>You are now logged into The Store</p>
                    <Col md={2} className={""}>
                        <Logout/><br/><br/>
                    </Col>
                    <Col md={10}>
                        <h3> Add Product to The Store</h3>
                        <CreateProduct/>
                    </Col>
                </Row><br/>
                <Container>
                    <Row>
                        <Col>
                            <h3> User List, Create a User</h3>
                            {/*<UserList></UserList>*/}
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
