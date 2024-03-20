/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap"


const Auto_v2_subcard1 = ({item}) => {
  return (
    <>
    <Col md={6} className="mb-2">
      <Card className="border-0">
        {<Card.Img variant="top" src={item.image} style={{aspectRatio:"16/9",objectFit:"fill",borderRadius:0}}/>}
        <Card.Body>
          <Card.Text>{item.content.slice(0,30)}</Card.Text>
          <p className="card-text text-muted small">Posted on : {item.date}</p>
        </Card.Body>
      </Card>
    </Col>
    </>
  )
}

export default Auto_v2_subcard1