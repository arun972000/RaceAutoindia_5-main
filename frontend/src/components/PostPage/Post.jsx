/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Image } from "react-bootstrap";
import LogoButtons from "./PostLogoBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Url } from "../../url";
import SideContent from "../SideContent/SideContent";
import DOMPurify from "dompurify";
import MyNavbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import Ad__90_728_1 from "../Ads/Ad_90_728_1";
import parse from "html-react-parser";

const PostPage = () => {
  const { title_slug } = useParams();

  const [data, setData] = useState([]);
  const [postTopad, setPostTopAd] = useState("");
  const [postBottomad, setPostBottomAd] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const postAdApi = async () => {
    try {
      const resheader = await axios.get(
        `${Url}api/ad_space/single_ad/posts_top`
      );
      const resfooter = await axios.get(
        `${Url}api/ad_space/single_ad/posts_bottom`
      );
      setPostTopAd(resheader.data[0].ad_code_728);
      setPostBottomAd(resfooter.data[0].ad_code_728);
    } catch (err) {
      console.log(err);
    }
  };

  const singlePost = async () => {
    try {
      const res = await axios.get(`${Url}api/post/singlePost/${title_slug}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    singlePost();
    postAdApi();
  }, []);

  return (
    <>
      <MyNavbar />
      <div className="main-content__position">
      <div className="container mt-4">
        <div className="row my-3">
          <div className="col-12 d-flex justify-content-center">
            <Ad__90_728_1>
              {postTopad ? (
                parse(postTopad)
              ) : window.innerWidth < 600 ? (
                <img src="https://placehold.co/400x50" alt="Placeholder Ad" />
              ) : (
                <img src="https://placehold.co/728x90" alt="Placeholder Ad" />
              )}
            </Ad__90_728_1>
          </div>
        </div>
        <div className="row  justify-content-center">
          <div className="col-lg-7 mt-3">
            {data.map((post) => (
              <div key={post.id}>
                <h3>
                  <b>{post.title}</b>
                </h3>
                <p>{post.summary}</p>
                <small className="">Date: {formatDate(post.created_at)}</small>
                <LogoButtons />
                <hr />
                <div
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={`https://raceautoindia.com/${post.image_big}`}
                    alt="Post Image"
                    fluid
                    className="my-3"
                    style={{ aspectRatio: "16/9", objectFit: "cover" }}
                  />

                  <div
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      textAlign: "justify",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <SideContent />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-center">
          <Ad__90_728_1>
            {postBottomad ? (
              parse(postBottomad)
            ) : window.innerWidth < 600 ? (
              <img src="https://placehold.co/400x50" alt="Placeholder Ad" />
            ) : (
              <img src="https://placehold.co/728x90" alt="Placeholder Ad" />
            )}
          </Ad__90_728_1>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;
