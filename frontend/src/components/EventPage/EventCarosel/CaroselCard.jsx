/* eslint-disable react/prop-types */

import { CardText } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const CaroselCard = ({item}) => {
  return (
    <div className="p-4">
    <Card className="shadow bg-body-tertiary rounded">
      <Card.Img
        variant="top"
        src={item.image}  // Replace with your image URL
        style={{ objectFit: 'cover', aspectRatio: '16/9' }}
      />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <CardText>{item.date}</CardText>
      </Card.Body>
    </Card>
    </div>
  );
};

export default CaroselCard;
