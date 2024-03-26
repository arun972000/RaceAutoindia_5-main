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
import SearchPage from "./components/SearchPanel/SearchPage";
import PostPage from "./components/PostPage/Post";
import ScrollToTop from "./components/ScrollToTop";
import PostList_Sub from "./components/PostComponentList/PostList_sub_category";
import PostList_Main from "./components/PostComponentList/PostList_main_category";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./components/ErrorPage";
import Admin_dashboard from "./components/Admin_Components/Admin_dashboard";
import { useState } from "react";
import Admin_article from "./components/Admin_Components/Admin_article";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/pdf/:title" element={<PDFPage />} />
        <Route path="/event" element={<Layout1 />} />
        <Route path="/eventlist/:category" element={<Layout2 />} />
        <Route path="/eventpage/:title" element={<Layout3 />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={
                <Admin_dashboard
                  isOpen={isOpen}
                  handleTrigger={handleTrigger}
                />
              }
            />
          }
        />
        <Route
          path="/admin/newsletter"
          element={
            <Admin_newLetter isOpen={isOpen} handleTrigger={handleTrigger} />
          }
        />
        <Route
          path="/admin/event"
          element={
            <PrivateRoute
              element={
                <Admin_Event isOpen={isOpen} handleTrigger={handleTrigger} />
              }
            />
          }
        />
        <Route
          path="/admin/article"
          element={
            <PrivateRoute
              element={
                <Admin_article isOpen={isOpen} handleTrigger={handleTrigger} />
              }
            />
          }
        />
        <Route path="/search/:word" element={<SearchPage />} />
        <Route path="/post/:title_slug" element={<PostPage />} />
        <Route
          path="/article/:main_category/:sub_category"
          element={<PostList_Sub />}
        />
        <Route path="/category/:main_category" element={<PostList_Main />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
