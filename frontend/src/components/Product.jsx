import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import {Link} from 'react-router-dom';
import {BiRupee} from "react-icons/bi";

function Product({product}) {
    let name = product.name;
    let image = product.image;
    let price = product.price;
  return (
    <Card className = "p-3 my-3">
    <Link to={`product/${product._id}`} >
      <Card.Img variant="top" src={image} style={{height: '200px' ,objectFit: 'scale-down' }} />
      </Link>
      <Card.Body>
      <Link to={`product/${product._id}`} style={{ color: 'black', textDecoration: 'none' }} >
        <Card.Title as="p" className='text-truncate'>{name}</Card.Title>
      </Link>
        <Card.Text as='h3'>
        <BiRupee/>{price}
        </Card.Text>
        <Rating value={product.rating} text={` ${product.numReviews} reviews`}/>
      </Card.Body>
    </Card>
  );
}

export default Product;