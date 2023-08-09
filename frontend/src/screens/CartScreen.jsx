import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import {BiRupee} from "react-icons/bi";
import { BsFillTrashFill } from 'react-icons/bs';

import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const handleQuantityChange = (product, quantity) => {
    if (quantity > 0) {
      addToCartHandler(product, Number(Math.min(quantity, product.countInStock)));
    } else {
      addToCartHandler(product, Number(1));
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2} className="d-flex justify-content-center">
                    <Image src={item.image} alt={item.name} style={{ height:80,  objectFit:'scale-down'}} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`} style={{ color: 'black', textDecoration: 'none' }}>{item.name}</Link>
                  </Col>
                  <Col md={2}><BiRupee />{item.price}</Col>
                  <Col md={2}>
                  <Form.Control type="number" value={item.qty}  onChange={(e) => handleQuantityChange(item, Number(e.target.value))} />
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
            <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)})
                {cartItems.length > 1 ? " items" :  " item"}
              </h3><h3>
              Total price : <BiRupee/>{cart.itemsPrice}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
