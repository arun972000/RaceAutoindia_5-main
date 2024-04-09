import NewsletterThumbnail from "../NewsletterThumbnail/NewsletterThumbnail";
// import ReactPlayer from "react-player/lazy";
import LatestNews from "./LatestNews";
import PopularPost from "../PopularPost/PopularPostContent";

const SideContent = () => {
  return (
    <>
      <div className="col-lg-4">
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center">
            {/* <ReactPlayer
              url="https://www.youtube.com/watch?v=Q3YBcEpJIK4"
              controls
              height="250px"
            /> */}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <NewsletterThumbnail />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <PopularPost />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 mb-3 d-flex justify-content-center">
            <div>
              <h6
                style={{
                  borderBottom: "3px solid black",
                  padding: 5,

                }}
              >
                LATEST NEWS
              </h6>
              <LatestNews />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideContent;
