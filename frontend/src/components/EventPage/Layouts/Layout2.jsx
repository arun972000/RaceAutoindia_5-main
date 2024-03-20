/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import EventCard from "../EventCard";
import { Url } from "../../../url";
import TopLogo from "../../Header/TopLogo";

import SideContent from "../../SideContent/SideContent";
import MyNavbar from "../../Header/Navbar";


const Layout2 = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try {
      const res = await axios.get(`${Url}api/event/eventpage/${category}`);
      setData(res.data);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [category]);

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Display an error message if the request returns an error
  if (error) {
    return (
      <div>
        <p>Error fetching data for {category} events. Please try again later.</p>
      </div>
    );
  }

  // Render the event cards if data is available
  const List = data.map((item) => <EventCard key={item.id} item={item} />);

  return (
    <>
      <TopLogo />
      <MyNavbar />
      <div className="row mt-5 me-2">
        <div className="col-md-3">
          <div style={{ width: 300, height: 250 }}></div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
            <h4>{category} events</h4>
          <div className="row justify-content-evenly">{List}</div>
            </div>
          </div>
          
        </div>
        <SideContent />
      </div>
    </>
  );
};

export default Layout2;
