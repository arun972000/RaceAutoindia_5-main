/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Url } from "../../url";
import SideContent from "../SideContent/SideContent";
import PaginatedItems from "./PaginationList";

const PostList_Main = () => {
  const { main_category } = useParams();
console.log(main_category)
  const [data, setData] = useState([]);

  const postListApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/main/${main_category}`);
      setData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    postListApi();
  }, [main_category]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 gx-5 mt-3">
            <div className="row">
              <PaginatedItems data={data} />
            </div>
          </div>
          <SideContent />
        </div>
      </div>
    </>
  );
};

export default PostList_Main;
