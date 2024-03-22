import "./App.css";
import { Routes, Route } from "react-router-dom";
import NewsLetter from "./components/NewsLetter/NewsLetter";
import Layout1 from "./components/EventPage/Layouts/Layout1";
import Layout2 from "./components/EventPage/Layouts/Layout2";
import Layout3 from "./components/EventPage/Layouts/Layout3";
import Admin_newLetter from "./components/Admin_Components/Admin_newLetter";
import Admin_Event from "./components/Admin_Components/Admin_Event";
import PDFPage from "./components/NewsLetter/PDFPage";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import SearchPage from "./components/SearchPanel/SearchPage";
import MyNavbar from "./components/Header/Navbar";
import { useContext } from "react";
import { RouterDataContext } from "./components/RoutingData/Route";
import PostPage from "./components/PostPage/Post";
import ScrollToTop from "./components/ScrollToTop";
import PostList_Sub from "./components/PostComponentList/PostList_sub_category";
import PostList_Main from "./components/PostComponentList/PostList_main_category";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
  const routerData = useContext(RouterDataContext);

  return (
    <>
      <MyNavbar />
      <Breadcrumbs/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/pdf/:title" element={<PDFPage />} />
        <Route path="/event" element={<Layout1 />} />
        <Route path="/eventlist/:category" element={<Layout2 />} />
        <Route path="/eventpage/:title" element={<Layout3 />} />
        <Route path="/admin_newsletter" element={<Admin_newLetter />} />
        <Route path="/admin_event" element={<Admin_Event />} />
        <Route path="/search/:word" element={<SearchPage />} />
        <Route path="/article/:main_category/:sub_category/:title_slug" element={<PostPage />} />
        <Route path="/article/:main_category/:sub_category" element={<PostList_Sub />} />
        <Route path="/article/:main_category" element={<PostList_Main/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
