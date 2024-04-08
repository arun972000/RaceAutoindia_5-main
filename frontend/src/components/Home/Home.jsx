import Footer from "../Footer/Footer";
import MyNavbar from "../Header/Navbar";
import SideContent from "../SideContent/SideContent";
import HomeContentMiddle from "./HomeContentMiddle";
import HomeContentTop from "./HomeContentTop";
import "./home.css"

const Home = () => {
  return (
    <>
      {/* <TopLogo /> */}
      <MyNavbar />
      <div className="main-content__position">
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <HomeContentTop />
            <div className="row">
              <div className="col-lg-8">
                <HomeContentMiddle />
              </div>
              <SideContent />
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
