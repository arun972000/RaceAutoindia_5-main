import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../url";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const LatestNews = () => {
  const scrollContainerStyle = { maxHeight: "300px" };

  const [data, setData] = useState([]);

  const LatestNewsApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/sliced-all`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LatestNewsApi();
  }, []);

  return (
    <>
      <div
        className="side-scrollbar side-scrollbar-primary"
        style={scrollContainerStyle}
      >
        {data.map((item) => (
          <div key={item.id} className="pe-2">
            <Link className="link-style" to={`/post/${item.title_slug}`}>
            <p>{item.title}</p>
            </Link>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestNews;
