/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap"


const Commercial_v2_subcard2 = ({item}) => {
  return (
    <>
    <div className="col-md-6">

    
    <Card className="border-0 bg-transparent">
      <Card.Body>
        <div className="row">
          <div className="col-md-6">
            <Card.Img
              variant="top"
              src={item.image}
              alt={item.title}
              className="img-fluid"
              style={{aspectRatio:"16/9",objectFit:"fill",borderRadius:0}}
            />
          </div>
          <div className="col-md-6 mt-2">
            <div className="content">
              <Card.Title>{item.content.slice(0, 30)}...</Card.Title>
              <Card.Text>
                {item.date}
              </Card.Text>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
    </div>
    </>
  )
}

export default Commercial_v2_subcard2