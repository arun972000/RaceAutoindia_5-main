/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { Row } from "react-bootstrap";
import { Url } from "../../url";
import Varient1 from "../Post_varients/Varient 1/Varient1";
import Varient2 from "../Post_varients/Varient 2/Varient2";
import Varient3 from "../Post_varients/Varient 3/Varient3";
import Varient4 from "../Post_varients/Varient 4/Varient4";
import { useEffect, useState } from "react";
import Varient5 from "../Post_varients/Varient 5/Varient5";
import "./HomepageCategory.css"

const HomepageCategory = ({ postData }) => {
  const [data, setData] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");

  const categoryListApi = async () => {
    try {
      const res = await axios.get(`${Url}api/category/main_sub/${postData.id}`);
      setCategoryList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const CategoryListSub = async () => {
    try {
      const res = await axios.get(
        `${Url}api/post/main/${postData.name_slug}/${selectedOption}`
      );

      if (res.data.length == 2) {
        setData(res.data[0]);
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const v3Single = data.slice(0, 1);

  const v2data = data.slice(0, 6);

  const v3data = data.slice(1, 10);

  useEffect(() => {
    categoryListApi();
    CategoryListSub();
  }, [selectedOption]);

  return (
    <>
      <div className="d-flex justify-content-between mt-5 align-items-center">
        <h6 className="">
          <span
            className="home-component-heading"
            style={{
              borderLeft: `4px solid ${postData.color}`,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "900",
              fontStyle: "normal",
              padding: 5,
              paddingLeft: 10,
              
            }}
          >
            {postData.name}
          </span>
        </h6>
        <div style={{ width: 200 }}>
          <select
            className="form-select"
            onChange={(e) => setSelectedOption(e.target.value)}
            aria-label="Default select example"
          >
            <option value={" "}>All</option>
            {categoryList.map((item) => (
              <option key={item.id} value={item.name_slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
      <Row className="mt-3">
        {postData.block_type == "block-1" &&
          data
            .map((item) => <Varient1 item={item} key={item.id} />)
            .slice(0, 3)}
        {postData.block_type == "block-2" && (
          <Varient3 item={v3data} single={v3Single} />
        )}
        {postData.block_type == "block-3" && <Varient2 item={v2data} />}
        {postData.block_type == "block-4" && (
          <Varient5 item={v3data} single={v3Single} />
        )}
        {postData.block_type == "block-5" &&
          data
            .map((item) => <Varient4 key={item.id} item={item} />)
            .slice(0, 2)}
      </Row>

    </>
  );
};

export default HomepageCategory;
