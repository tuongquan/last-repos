
import { Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function ItemPro(props) {
  let pa = `/products/${props.obj.id}/`;
  return (
    <>
      <Col md={3} xs={12}>
        <Card>
          <Link to={pa}>
          <Card.Img variant="top" src={props.obj.avatar} />
          </Link>
          <Card.Body>
            <Card.Title>{props.obj.name}</Card.Title>
            <Card.Text>{props.obj.price} VND</Card.Text>
            <Button variant="danger">Đặt hàng</Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}