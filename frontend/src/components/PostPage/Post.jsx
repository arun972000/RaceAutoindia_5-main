/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Image } from "react-bootstrap";
import LogoButtons from "./PostLogoBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Url } from "../../url";
import SideContent from "../SideContent/SideContent";
import Ad_1 from "../Ads/Ad_1";
import DOMPurify from "dompurify";
import MyNavbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const PostPage = () => {
  const { title_slug } = useParams();

  const [data, setData] = useState([]);

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

  const singlePost = async () => {
    try {
      const res = await axios.get(`${Url}api/post/single/${title_slug}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    singlePost();
  }, []);

  return (
    <>
      <MyNavbar />
      <div className="container mt-3">
        <div className="row mb-3">
          <div className="col-12 d-flex justify-content-center">
            <Ad_1 />
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
                <small className="text-muted">
                  Date: {formatDate(post.created_at)}
                </small>
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
      <Footer />
    </>
  );
};

export default PostPage;
