import { FaClipboardList } from "react-icons/fa";
import "./Dashboard.css";
import DashboardCard from "./DashboardCard";
import { BarChart } from "../Chart/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../../url";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  const [value, setValue] = useState({});

  const chartValue = [];

  const api = async () => {
    try {
      const res = await axios.get(`${Url}api/dashboard/postChart`);
      setValue(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    api();
  }, []);

  Object.keys(value).forEach((key) => {
    const propertyValue = value[key];

    chartValue.push(propertyValue);
  });

  return (
    <>
      <div className="col-12 ">
        <div className="row mt-4">
          <DashboardCard
            icon={<FaClipboardList className="ms-2" size={30} />}
            title={"post"}
            total={45}
          />
          <DashboardCard
            icon={<FaClipboardList className="ms-2" size={30} />}
            title={"user"}
            total={100}
          />
          <DashboardCard
            icon={<FaClipboardList className="ms-2" size={30} />}
            title={"newsletter"}
            total={100}
          />
          <DashboardCard
            icon={<FaClipboardList className="ms-2" size={30} />}
            title={"event"}
            total={100}
          />
        </div>
        <div className="row mt-4">
          <div className="col-lg-8">
            <Card className="p-3 mb-3 border-0 shadow">
              <BarChart value={chartValue} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
