import { useEffect, useState } from "react";
import PostCategory from "../PostComponentHome/PostCategory";
import axios from "axios";
import { Url } from "../../url";
import parse from "html-react-parser";
import Ad__90_728_1 from "../Ads/Ad_90_728_1";

const HomeContentMiddle = () => {
  const [indexBottom, setIndexBottom] = useState({});

  const adApi = async () => {
    try {
      const resIndexbottom = await axios.get(
        `${Url}api/ad_space/single_ad/index_bottom`
      );
      setIndexBottom({
        ...indexBottom,
        ad_code_728: resIndexbottom.data[0].ad_code_728,
        ad_code_300: resIndexbottom.data[0].ad_code_300,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    adApi();
  }, []);
  return (
    <>
      <PostCategory />
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Ad__90_728_1>
            {window.innerWidth < 600 ? (
              parse(String(indexBottom.ad_code_300))
            ) : (
              parse(String(indexBottom.ad_code_728))
            )}
          </Ad__90_728_1>
        </div>
      </div>
    </>
  );
};

export default HomeContentMiddle;
