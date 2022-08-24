// import {useDispatch, useSelector} from "react-redux";
// import {Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
// import {SHOW_USERS} from "../../modules/reducer";
//
// export default function UserList() {
//     const dispatch = useDispatch();
//     let users = useSelector(state => state.users);
//     console.log(users)
//
//     function onClick(id) {
//         dispatch({type: SHOW_USERS, data: id})
//     }
//
//     return (
//         <ListGroup>
//             {users.map((user, id) => {
//                 return (
//                     <ListGroupItem key={id} onClick={e => onClick(user.id)}>
//                         <>
//
//                             <Row>
//                                 <p>Name:{" "}{user.lastName},{" "}{user.firstName}</p>
//                             </Row>
//                             <Row>
//                                 <p>username:{" "}{user.username}</p>
//                             </Row>
//
//                         </>
//                     </ListGroupItem>);
//             })
//             }
//         </ListGroup>
//     );
// }