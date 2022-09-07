import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {useState} from "react";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import CreateUser from "./components/Users/CreateUser";
import UserList from "./components/Users/UserList";
import CreateProduct from "./components/Products/CreateProduct";
import {ProductList} from "./components/Products/ProductList";
import {ProductDetails} from "./components/Products/ProductDetails";
import {UserDetails} from "./components/Users/UserDetails";

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
                {errorMessage && errorMessage}
                <Row>

                    <Col md={2} className={""}>
                        <p>You are now logged into The Store</p>
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
                            <h3> Product List</h3>
                            <ProductList></ProductList>
                        </Col>
                        <Col>
                            <h3> User List</h3>
                            <UserList></UserList>
                        </Col>
                        <Col>
                            <h3> Create a User</h3>
                            <CreateUser></CreateUser>
                        </Col>
                    </Row>
                </Container>
                <ProductDetails/>
                <UserDetails/>
            </>
        );
    } else {
        return (
            <>
                <Login></Login>
                <Signup></Signup><br/><br/>
                <ProductList></ProductList>
            </>
        );
    }


    // return (<>
    //     {
    //         currentUser ? (
    //                 <>
    //
    //                     <Row>
    //                         {errorMessage && errorMessage}
    //                         <p>You are now logged into The Store</p>
    //                         <Col md={2} className={""}>
    //                             <Logout/><br/><br/>
    //                         </Col>
    //                         <Col md={10}>
    //                             <h3> Add Product to The Store</h3>
    //                             <CreateProduct/>
    //                         </Col>
    //                     </Row><br/>
    //                     <Container>
    //                         <Row>
    //                             <Col>
    //                                 <h3> Product List</h3>
    //                                 <ProductList></ProductList>
    //                             </Col>
    //                             <Col>
    //                                 <h3> User List</h3>
    //                                 <UserList></UserList>
    //                             </Col>
    //                             <Col>
    //                                 <h3> Create a User</h3>
    //                                 <CreateUser></CreateUser>
    //                             </Col>
    //                         </Row>
    //                     </Container>
    //                     <ProductDetails/>
    //                     <UserDetails/>
    //                 </>
    //             )
    //             :
    //             <>
    //                 <Login></Login>
    //                 <Signup></Signup>
    //             </>
    //     }
    // </>)
}