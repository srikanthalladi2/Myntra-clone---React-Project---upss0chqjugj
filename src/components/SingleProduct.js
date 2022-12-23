import { Card, Button, Modal } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { useState } from "react";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();


  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);
  return (
    <>
    <div className="products" onClick={handleShow}>
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>Rs. {prod.price.split(".")[0]}</span>
            {prod.fastDelivery ? (
              <div className="deliveryText">Fast Delivery</div>
            ) : (
              <div className="deliveryText">4 days delivery</div>
            )}
            <Rating rating={prod.ratings} />
          </Card.Subtitle>
         
        </Card.Body>
      </Card>
    </div>
       <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
      
         <Modal.Title>{prod.name}</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <Card.Img variant="top" src={prod.image} alt={prod.name} />
       <div className="buttonSizes">
        <p>Size Chart:</p>
        <Button>S</Button>
        <Button>M</Button>
        <Button>L</Button>
        <Button>XL</Button>
       </div>
       </Modal.Body>
       <Modal.Footer>
         {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
       </Modal.Footer>
     </Modal>
    </>
  );
};

export default SingleProduct;
