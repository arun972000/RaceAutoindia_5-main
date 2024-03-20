import { useEffect, useState } from "react";
import EventCard from "../EventCard";
import axios from "axios";
import { Url } from "../../../url";


const FestivelEvent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiFetch = async () => {
    try {
      const res = await axios.get(`${Url}api/event/eventpage/Festival`);
      setData(res.data);

    } catch (err) {
      setError(err);
    }finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    apiFetch();
  }, []);

  // Display a Bootstrap spinner while data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Display an error message if the request returns a 404
  if (error && error.response && error.response.status === 404) {
    return (
      <div>
        <p>No data found for Festival Events.</p>
      </div>
    );
  }

  // Render the event cards if data is available
  const List = data.map((item) => <EventCard key={item.id} item={item} />).slice(0,2);

  return (
    <>
      <div className="heading--1 mb-4 mt-3 text-center" style={{ color: "#ba0000" }}>
        <h4>Festival Events in Chennai</h4>
      </div>
      <div className="row justify-content-evenly">{List}</div>
    </>
  );
};

export default FestivelEvent;
