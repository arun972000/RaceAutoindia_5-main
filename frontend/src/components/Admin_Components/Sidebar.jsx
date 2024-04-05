/* eslint-disable react/prop-types */
import { MdArticle, MdEventAvailable } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosMail, IoIosSettings } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { RiAdvertisementFill } from "react-icons/ri";
import "./sideBar.css";

import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";

function SideBar({ isOpen, handleTrigger }) {
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
        <Link to="/admin/articlelist">
          <div className="sidebar-position">
            <MdArticle />
            <span>Post</span>
          </div>
        </Link>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="acc-heading">
                <BiCategory />
                <span>CATEGORY</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Link to="/admin/main-category">
                <div className="acc-body">
                  {" "}
                  <MdEventAvailable />
                  <span style={{ fontSize: 12 }}>Main Category</span>
                </div>
              </Link>
              <Link to="/admin/sub-category">
                <div className="mt-3 acc-body">
                  <MdEventAvailable />{" "}
                  <span style={{ fontSize: 12 }}>Sub Category</span>
                </div>
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Link to="/admin/ad_space">
          <div className="sidebar-position">
            <RiAdvertisementFill />
            <span>AD SPACE</span>
          </div>
        </Link>
        <Link to="/admin/generalSettings">
          <div className="sidebar-position">
          <IoIosSettings />
            <span>GENERAL SETTINGS</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
