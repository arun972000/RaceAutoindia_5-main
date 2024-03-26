/* eslint-disable react/prop-types */
import { MdArticle, MdEventAvailable } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { IoHome } from "react-icons/io5";

import "./sideBar.css";

import { Link } from "react-router-dom";

function SideBar({isOpen, handleTrigger}) {
 
  return (
    <div className="col-md-auto sidebar__position p-0">
      <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="trigger" onClick={handleTrigger}>
          {isOpen ? <IoClose /> : <CiMenuBurger />}
        </div>
        <Link to="/admin">
          <div className="sidebar-position">
            <IoHome />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/admin/newsletter">
          {" "}
          <div className="sidebar-position">
            <IoIosMail />
            <span>Newsletter</span>
          </div>
        </Link>
        <Link to="/admin/event">
          <div className="sidebar-position">
            <MdEventAvailable />
            <span>Event</span>
          </div>
        </Link>
        <Link to="/admin/article">
          <div className="sidebar-position">
            <MdArticle /> 
            <span>Post</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
