/* eslint-disable react/no-unknown-property */
import axios from "axios";
import logo from "/src/assets/raceindialogo.svg";
import { useEffect, useState } from "react";
import { Url } from "../../url";
import NavMainCategory from "./NavMainCategory";
import "./Navbar.css";
import "./TopLogo.css";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../Login/Register/Login_Register";

function MyNavbar() {
  const [data, setData] = useState([]);

  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();

  const [search, setSearch] = useState("");

  const [active, setActive] = useState("home");

  const navigate = useNavigate();

  const mainCategory = async () => {
    try {
      const res = await axios.get(`${Url}api/category/categoryList`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlecloseLogin = () => setShowLogin(false);

  useEffect(() => {
    mainCategory();
  }, []);

  const Main_Category = data
    .filter((item) => item.show_on_menu == 1)
    .map((item) => (
      <NavMainCategory
        item={item}
        key={item.id}
        active={active}
        setActive={setActive}
      />
    ));

  return (
    <div className="position-Nav">
      <nav className="navbar shadow navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            className="img-fluid mx-2"
            alt="Responsive image"
            width="190px"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse py-2 navbar-collapse nav-list__bg-red"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className={
                  active == "home"
                    ? "nav-link border_bottom active-nav mx-2 "
                    : "nav-link border_bottom mx-2"
                }
                href="#"
                onClick={() => setActive("home")}
              >
                HOME
              </a>
            </li>
            {Main_Category}
            <li className="nav-item dropdown mx-1 ">
              <a
                className={
                  active == "more"
                    ? "nav-link border_bottom dropdown-toggle active-nav mx-2 "
                    : "nav-link dropdown-toggle border_bottom mx-2"
                }
                href="#"
                onClick={() => setActive("more")}
              >
                MORE
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  CONTACT
                </a>
                <a className="dropdown-item" href="#">
                  ABOUT US
                </a>
              </div>
            </li>
          </ul>
          <div className="d-flex ms-auto align-items-center">
            {!location.pathname.includes("/search/") && (
              <div className="search__root ">
                {" "}
                <form role="search" className="search__form">
                  <label htmlFor="search" className="search__label">
                    Search for stuff
                  </label>
                  <input
                    id="search"
                    type="search"
                    className="search__input"
                    placeholder="Search..."
                    autoFocus
                    required
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="search__btn"
                    onClick={() => navigate(`/search/${search}`)}
                  >
                    Go
                  </button>
                </form>
              </div>
            )}
            <button
              type="button"
              className="mx-3 btn btn-light"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <LoginPage showLogin={showLogin} hideLogin={handlecloseLogin} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MyNavbar;
