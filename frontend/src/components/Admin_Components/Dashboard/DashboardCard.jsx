/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";

const DashboardCard = ({ icon, title, total }) => {
  return (
    <div className="col-lg-3">
      <Card className="mb-3 border-0 shadow dashboard__card">
        <Card.Body className="d-flex justify-content-between">
          <div className="p-4">
            <h2>{total}</h2>
            <h6>{title}</h6>
          </div>
          <div className="d-flex align-items-center">{icon}</div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardCard;
