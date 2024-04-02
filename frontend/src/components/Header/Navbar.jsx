/* eslint-disable react/no-unknown-property */
import axios from "axios";
import logo from "/src/assets/raceindialogo.svg";
import { useEffect, useState } from "react";
import { Url } from "../../url";
import NavMainCategory from "./NavMainCategory";
import "./Navbar.css";
import "./TopLogo.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoginPage from "../Login/Register/Login_Register";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { IoSearch } from "react-icons/io5";

function MyNavbar() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const params = useParams();

  const token = Cookies.get("token");

  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();

  const [search, setSearch] = useState("");

  const [active, setActive] = useState(
    sessionStorage.getItem("activeItem") || "home"
  );

  let userComponent;

  if (!token || typeof token !== "string") {
    userComponent = (
      <button
        type="button"
        className="mx-3 btn btn-light"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>
    );
  } else {
    try {
      const decode = jwtDecode(token);
      if (decode.email) {
        userComponent = (
          <div className="dropdown mx-3">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUser /> <span className="ms-3">USER</span>
            </button>
            <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <Link className="dropdown-item" to="/admin">
                  Admin
                </Link>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    Cookies.remove("token");
                    localStorage.removeItem("userType");
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        );
      } else {
        userComponent = (
          <button
            type="button"
            className="mx-3 btn btn-light"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        );
      }
    } catch (err) {
      userComponent = (
        <button
          type="button"
          className="mx-3 btn btn-light"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      );
    }
  }

  const mainCategory = async () => {
    try {
      const res = await axios.get(`${Url}api/category/categoryList`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  if (Object.keys(params).length === 0) {
    sessionStorage.setItem("activeItem", "home");
  }
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
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            className="img-fluid mx-2"
            alt="Responsive image"
            width="160px"
          />
        </Link>
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
              <Link
                to="/"
                className={
                  active == "home"
                    ? "nav-link border_bottom nav-home_btn active-nav mx-2 "
                    : "nav-link border_bottom mx-2"
                }
                onClick={() => {
                  setActive("home");
                  sessionStorage.setItem("activeItem", "home");
                }}
              >
                HOME
              </Link>
            </li>
            {Main_Category}
            <li className="nav-item dropdown mx-1 ">
              <a
                className={
                  active == "more"
                    ? "nav-link border_bottom dropdown-toggle active-nav "
                    : "nav-link dropdown-toggle border_bottom "
                }
                href="#"
                onClick={() => {
                  setActive("more");
                }}
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
              // <div className="search__root ">
              //   {" "}
              //   <form role="search" className="search__form">
              //     <label htmlFor="search" className="search__label">
              //       Search for stuff
              //     </label>
              //     <input
              //       id="search"
              //       type="search"
              //       className="search__input"
              //       placeholder="Search..."
              //       autoFocus
              //       required
              //       onChange={(e) => setSearch(e.target.value)}
              //     />
              //     <button
              //       className="search__btn"
              //       onClick={() => navigate(`/search/${search}`)}
              //     >
              //       Go
              //     </button>
              //   </form>
              // </div>
              <IoSearch size={25} className="me-3"/>
            )}
            {/* <button
              type="button"
              className="mx-3 btn btn-light"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button> */}
            {userComponent}
            <LoginPage showLogin={showLogin} hideLogin={handlecloseLogin} />
          </div>
          {/* <div>
            <FaUser />
            <li className="nav-item dropdown mx-1 ">
              <a
                className="nav-link dropdown-toggle border_bottom mx-2"
                href="#"
                onClick={() => {
                  setActive("more");
                }}
              >
                USER
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Admin
                </a>
                <a className="dropdown-item" href="#">
                  ABOUT US
                </a>
              </div>
            </li>
          </div> */}
        </div>
      </nav>
    </div>
  );
}

export default MyNavbar;
