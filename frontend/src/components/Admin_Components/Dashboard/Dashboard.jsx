/* eslint-disable react-hooks/exhaustive-deps */
import { FaClipboardList } from "react-icons/fa";
import "./Dashboard.css";
import DashboardCard from "./DashboardCard";
import { BarChart } from "../Chart/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../../url";
import { Card, Form } from "react-bootstrap";
import DasboardTable from "./DasboardTable";
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";

const Dashboard = () => {
  const [value, setValue] = useState({});

  const [data, setData] = useState([]);

  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const chartValue = [];

  // Generate options for the current year and the previous three years
  const options = [];
  for (let year = currentYear; year >= currentYear - 3; year--) {
    options.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  const totalnumberApi = async () => {
    try {
      const res = await axios.get(`${Url}api/dashboard/totalnumbers`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const chartapi = async () => {
    try {
      const res = await axios.get(
        `${Url}api/dashboard/postChart/${selectedYear}`
      );
      setValue(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    chartapi();
    totalnumberApi();
  }, [selectedYear]);

  Object.keys(value).forEach((key) => {
    const propertyValue = value[key];

    chartValue.push(propertyValue);
  });

  return (
    <>
      <div className="col-12 ">
        <div className="row mt-4">
          <DashboardCard
            icon={
              <FaClipboardList
                className="ms-2"
                size={50}
                style={{
                  backgroundColor: "#2ed3b8",
                  padding: 10,
                  borderRadius: 50,
                  color: "white",
                }}
              />
            }
            title={"post"}
            total={data.totalPost}
          />
          <DashboardCard
            icon={
              <FaUser
                className="ms-2"
                size={50}
                style={{
                  backgroundColor: "#9fa6ad",
                  padding: 10,
                  borderRadius: 50,
                  color: "white",
                }}
              />
            }
            title={"user"}
            total={data.totalUser}
          />
          <DashboardCard
            icon={
              <IoIosMail
                className="ms-2"
                size={50}
                style={{
                  backgroundColor: "#f97970",
                  padding: 10,
                  borderRadius: 50,
                  color: "white",
                }}
              />
            }
            title={"newsletter"}
            total={100}
          />
          <DashboardCard
            icon={
              <MdEventAvailable
                className="ms-2"
                size={50}
                style={{
                  backgroundColor: "#10bee8",
                  padding: 10,
                  borderRadius: 50,
                  color: "white",
                }}
              />
            }
            title={"event"}
            total={100}
          />
        </div>
        <div className="row mt-4">
          <div className="col-lg-8">
            <Form.Select
              aria-label="Default select example"
              style={{ width: 100, marginBottom: 10 }}
              value={selectedYear}
              onChange={handleYearChange}
            >
              {options}
            </Form.Select>
            <Card className="p-3 mb-3 border-0 shadow">
              <BarChart value={chartValue} />
            </Card>
          </div>
          <div className="col-lg-4">
            <DasboardTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
