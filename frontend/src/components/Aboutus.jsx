/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

import axios from "axios";

import { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import { Url } from "../url";
import MyNavbar from "./Header/Navbar";
import Footer from "./Footer/Footer";

const AboutUsPage = () => {
  const [data, setData] = useState("");

  const pageContentApi = async () => {
    try {
      const res = await axios.get(`${Url}api/pages/pageData/about-us`);
      setData(res.data[0].page_content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    pageContentApi();
  }, []);

  return (
    <>
      <MyNavbar />
      <div className="main-content__position">
      <div className="container mt-5">
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            textAlign: "justify",
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data),
          }}
        ></div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
