import {useDispatch, useSelector} from "react-redux";
import {SHOW_PRODUCTS} from "../../modules/reducer";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export function ProductList() {
    const dispatch = useDispatch();
    let prod = useSelector(state => state.products);

    function onClick(id) {
        dispatch({type: SHOW_PRODUCTS, data: id})
    }
    return (
        <ListGroup>
            {prod?.map((prod, idx) => {
                return (
                    <ListGroupItem key={idx} onClick={() => onClick(prod.id)}>
                        <p>Product: {prod.name}</p>
                        <p>Price: ${prod.price}</p>
                    </ListGroupItem>
                )
            })}
        </ListGroup>

    )
}