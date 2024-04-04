/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Url } from "../../url";
import SideContent from "../SideContent/SideContent";
import PaginatedItems from "./PaginationList";
import Ad_1 from "../Ads/Ad_90_1024";
import MyNavbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const PostList_Sub = () => {
  const { main_category, sub_category } = useParams();

  const [data, setData] = useState([]);

  const postListApi = async () => {
    try {
      const res = await axios.get(
        `${Url}api/post/main/${main_category}/${sub_category}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    postListApi();
  }, [sub_category]);

  return (
    <>
      <MyNavbar />
      <div className="container mt-3">
        <div className="row mb-2">
          <div className="col-12 d-flex justify-content-center">
            <Ad_1 />
          </div>
        </div>
        <div className="row  gx-5 justify-content-center">
          <div className="col-lg-7 mt-4">
            <div className="row ">
              <PaginatedItems data={data} />
            </div>
          </div>
          <SideContent />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostList_Sub;
