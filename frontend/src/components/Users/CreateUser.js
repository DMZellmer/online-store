import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Modal, Row} from "react-bootstrap";
import {createUser} from "../../modules/reducer";

export default ()=>{
    const dispatch = useDispatch();
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [shown, setShown] = useState(false);
    let [isOwner, setIsOwner] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
        dispatch(createUser(username,password,isOwner))
    }

    return (
        <Col>
            <Modal show={shown}>
                <Form className={"m-4"} onSubmit={handleSubmit}>
                    <Row>
                        <FormGroup>
                            <FormLabel> Username </FormLabel>
                            <FormControl type={"text"} placeholder={"username"}
                                         onChange={event => setUsername(event.target.value)}></FormControl>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <FormLabel> Password </FormLabel>
                            <FormControl type={"password"} placeholder={"password"}
                                         onChange={event => setPassword(event.target.value)}></FormControl>
                        </FormGroup>
                    </Row>
                    <Row>
                        <Col>
                            <FormLabel> Owner </FormLabel>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <input type={"checkbox"} id="defaultCheck1"
                                       onChange={event => setIsOwner(event.target.checked)}></input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            <Button type={"submit"} onClick={() => setShown(false)}> Create User </Button>
                        </Col>
                        <Col>
                            <Button type={"button"} onClick={() => setShown(false)}> Close </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Button onClick={() => setShown(true)}> Create User </Button>
        </Col>
    );
}