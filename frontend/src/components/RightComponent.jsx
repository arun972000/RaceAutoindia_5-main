/* eslint-disable react/prop-types */

import Card from "react-bootstrap/Card";

const RightComponents = ({ item }) => {
  return (
    <Card className="border-0">
      <Card.Body>
        <div className="row">
          <div className="col-md-6">
            <Card.Img
              variant="top"
              src={item.image}
              alt={item.title}
              className="img-fluid"
              style={{
                aspectRatio: "16/9",
                objectFit: "fill",
                borderRadius: 0,
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="content">
              <Card.Title>{item.content.slice(0, 10)}...</Card.Title>
              <Card.Text>{item.date}</Card.Text>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RightComponents;
