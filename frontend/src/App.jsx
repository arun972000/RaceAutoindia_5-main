/* eslint-disable no-useless-escape */
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import "./App.css";
import { ThemeDataContext } from "./components/Theme/Theme";
import Admin_GeneralSettingsPage from "./components/Admin_Components/GeneralSettings/GeneralSettingsPage";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { Url } from "./url";
import parse from "html-react-parser";

const NewsLetter = lazy(() => import("./components/NewsLetter/NewsLetter"));
const Layout1 = lazy(() => import("./components/EventPage/Layouts/Layout1"));
const Layout2 = lazy(() => import("./components/EventPage/Layouts/Layout2"));
const Layout3 = lazy(() => import("./components/EventPage/Layouts/Layout3"));
const Admin_newLetter = lazy(() =>
  import("./components/Admin_Components/Admin_newLetter")
);
const Admin_Event = lazy(() =>
  import("./components/Admin_Components/Admin_Event")
);
const PDFPage = lazy(() => import("./components/NewsLetter/PDFPage"));
const Home = lazy(() => import("./components/Home/Home"));
const SearchPage = lazy(() => import("./components/SearchPanel/SearchPage"));
const PostPage = lazy(() => import("./components/PostPage/Post"));
// const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const PostList_Sub = lazy(() =>
  import("./components/PostComponentList/PostList_sub_category")
);
const PostList_Main = lazy(() =>
  import("./components/PostComponentList/PostList_main_category")
);
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const ErrorPage = lazy(() => import("./components/ErrorPage"));
const Admin_dashboard = lazy(() =>
  import("./components/Admin_Components/Admin_dashboard")
);
const Admin_article = lazy(() =>
  import("./components/Admin_Components/Admin_article")
);
const Admin_ArticleList = lazy(() =>
  import("./components/Admin_Components/Admin_articleList")
);
const Admin_articleEdit = lazy(() =>
  import("./components/Admin_Components/Admin_articleEdit")
);
const Admin_mainCategory = lazy(() =>
  import("./components/Admin_Components/Admin_mainCategory")
);
const Admin_Edit_mainCategory = lazy(() =>
  import("./components/Admin_Components/Admin_Edit_mainCategory")
);
const Admin_subCategory = lazy(() =>
  import("./components/Admin_Components/Admin_subCategory")
);
const Admin_Edit_subCategory = lazy(() =>
  import("./components/Admin_Components/Admin_Edit_subCategory")
);

function App() {
  const theme = useContext(ThemeDataContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleTrigger = () => setIsOpen(!isOpen);
  const [metaTag, setMetaTag] = useState([]);
  const fetchHeaderCode = async () => {
    try {
      const res = await axios.get(`${Url}api/settings/headerCode`);
      setMetaTag(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHeaderCode();
  }, []);
  return (
    <div className={theme.theme ? "app" : "dark"}>
      {metaTag.map((item, i) => (
        <HelmetProvider key={i}>
          <Helmet>
            {parse(item.custom_header_codes)}
          </Helmet>
        </HelmetProvider>
      ))}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsletter" element={<NewsLetter />} />
          <Route path="/pdf/:title" element={<PDFPage />} />
          <Route path="/event" element={<Layout1 />} />
          <Route path="/eventlist/:category" element={<Layout2 />} />
          <Route path="/eventpage/:title" element={<Layout3 />} />
          <Route path="/search/:word" element={<SearchPage />} />
          <Route path="/post/:title_slug" element={<PostPage />} />
          <Route
            path="/article/:main_category/:sub_category"
            element={<PostList_Sub />}
          />
          <Route path="/category/:main_category" element={<PostList_Main />} />
          <Route path="*" element={<ErrorPage />} />

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
            path="/admin/generalSettings"
            element={
              <PrivateRoute
                element={
                  <Admin_GeneralSettingsPage
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
            path="/admin/articlelist"
            element={
              <PrivateRoute
                element={
                  <Admin_ArticleList
                    isOpen={isOpen}
                    handleTrigger={handleTrigger}
                  />
                }
              />
            }
          />
          <Route
            path="/admin/article"
            element={
              <PrivateRoute
                element={
                  <Admin_article
                    isOpen={isOpen}
                    handleTrigger={handleTrigger}
                  />
                }
              />
            }
          />
          <Route
            path="/admin/edit-post/:id"
            element={
              <PrivateRoute
                element={
                  <Admin_articleEdit
                    isOpen={isOpen}
                    handleTrigger={handleTrigger}
                  />
                }
              />
            }
          />
          <Route
            path="/admin/edit-main-category/:id"
            element={
              <PrivateRoute
                element={
                  <Admin_Edit_mainCategory
                    isOpen={isOpen}
                    handleTrigger={handleTrigger}
                  />
                }
              />
            }
          />
          <Route
            path="/admin/edit-sub-category/:id"
            element={
              <PrivateRoute
                element={
                  <Admin_Edit_subCategory
                    isOpen={isOpen}
                    handleTrigger={handleTrigger}
                  />
                }
              />
            }
          />
          <Route
            path="/admin/main-category"
            element={
              <PrivateRoute
                element={
                  <Admin_mainCategory
                    isOpen={isOpen}
                    handleTrigger={handleTrigger}
                  />
                }
              />
            }
          />
          <Route
            path="/admin/sub-category"
            element={
              <PrivateRoute
                element={
                  <Admin_subCategory
                    isOpen={isOpen}
                    handleTrigger={handleTrigger}
                  />
                }
              />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
