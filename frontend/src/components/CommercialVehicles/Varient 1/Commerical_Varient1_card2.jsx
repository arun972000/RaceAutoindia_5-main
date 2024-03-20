/* eslint-disable react/prop-types */

import Card from 'react-bootstrap/Card';

const Commercial_v1_subCard = ({item}) => {

  return (
    <Card className="mb-1 border-0 bg-transparent">
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
          <div className="col-md-6">
            <div className="content">
              <Card.Title>{item.content.slice(0,30)}...</Card.Title>
           
              <p className="card-text text-muted small">Posted on : {item.date}</p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Commercial_v1_subCard;
