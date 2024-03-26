import axios from "axios";
import { Card } from "react-bootstrap";
import { Url } from "../../../url";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const DasboardTable = () => {
  const [data, setData] = useState([]);

  const tableApi = async () => {
    try {
      const res = await axios.get(`${Url}api/dashboard/most_viewed`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    tableApi();
  }, []);

  return (
    <div className="row">
      <h6 className="my-4" style={{ fontWeight: 700 }}>
        Most viewed posts
      </h6>
      {data
        .map((item) => (
          <div className="col-12 col-md-6 col-lg-12" key={item.title}>
            <Link to={`/post/${item.title_slug}`}>
              <Card className="border-0 mb-3 shadow">
                <div className="row">
                  <div className="col-6">
                    <Card.Img
                      variant="top"
                      src={`https://raceautoindia.com/${item.image_mid}`}
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        borderRadius: 0,
                        height: 100,
                      }}
                    />
                  </div>
                  <div className="col-6 p-2">
                    <Card.Body className="">
                      <Card.Title className="dashboard-heading">
                        {item.title}
                      </Card.Title>
                      <Card.Text>Total Views: {item.pageviews}</Card.Text>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))
        .slice(0, 4)}
    </div>
  );
};

export default DasboardTable;
