import { useEffect, useState } from "react";
import { Url } from "../../url.js";
import axios from "axios";

import PopularCard from "./PopularCard.jsx";
// import { ThemeDataContext } from "../Theme/Theme.jsx";

const PopularPost = () => {
  const [data, setData] = useState([]);

  // const theme = useContext(ThemeDataContext);

  const popularApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/sliced-all`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    popularApi();
  }, []);
  return (
    <>
      <h6
        style={{
          backgroundColor: "#1d5dec",
          padding: 5,
          color:"white"
        }}
      >
        POPULAR POSTS
      </h6>
      {data
        .map((item) => <PopularCard key={item.id} item={item} />)
        .slice(0, 3)}
    </>
  );
};

export default PopularPost;
