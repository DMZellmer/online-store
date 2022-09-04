import {useDispatch} from "react-redux";
import {useState} from "react";
import {createProduct} from "../../modules/requests";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

export default function CreateProduct() {
    const dispatch = useDispatch();
    let [name, setName] = useState("");
    let [price, setPrice] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        dispatch(createProduct(name, price));
    }
    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel> Name of Product </FormLabel>
                    <FormControl type={"text"} onChange={e => setName(e.target.value)}></FormControl>
            </FormGroup><br/>
            <FormGroup>
                <FormLabel> Price ($ USD) </FormLabel>
                <FormControl type={"number"} onChange={e => setPrice(e.target.value)}></FormControl>
            </FormGroup><br/>
            <Button type={"submit"}> Add Product to Store </Button>
        </Form>
    )
}