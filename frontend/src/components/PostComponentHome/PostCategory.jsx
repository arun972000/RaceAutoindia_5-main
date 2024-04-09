import axios from "axios";
import { Url } from "../../url.js";
import { useEffect, useState } from "react";

import HomepageCategory from "./HomepageCategory.jsx";
import Ad__90_728_1 from "../Ads/Ad_90_728_1.jsx";
// import MyComponent from "../Ads/AdSlider.jsx";

const PostCategory = () => {
  const [data, setData] = useState([]);
  const category = async () => {
    try {
      const res = await axios.get(`${Url}api/category/categoryList`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    category();
  }, []);

  const showHome_1 = data
    .filter((item) => item.show_at_homepage == 1)
    .map((item) => <HomepageCategory key={item.id} postData={item} />)
    .slice(0, 2);
  const showHome_2 = data
    .filter((item) => item.show_at_homepage == 1)
    .map((item) => <HomepageCategory key={item.id} postData={item} />)
    .slice(2);
  return (
    <>
      {showHome_1}
{/* < MyComponent /> */}
      {showHome_2}
      <div className="col-12 mt-3 d-flex justify-content-center">
        <Ad__90_728_1 />
      </div>
    </>
  );
};

export default PostCategory;
