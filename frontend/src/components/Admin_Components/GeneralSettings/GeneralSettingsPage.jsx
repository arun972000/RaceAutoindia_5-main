/* eslint-disable react/prop-types */
import { Tab, Tabs } from "react-bootstrap";
import AdminNavbar from "../Admin Navbar/Navbar";
import SideBar from "../Sidebar";
import HeaderCode from "./HeaderCode";
import FontSetting from "./Fontsettings";
import SidebarVisible from "./sideBarvisible";

const Admin_GeneralSettingsPage = ({ isOpen, handleTrigger }) => {
  return (
    <>
      <div className="container-fluid custom-container-fluid">
        <div className="row d-flex">
          <SideBar isOpen={isOpen} handleTrigger={handleTrigger} />
          <div
            className={
              isOpen
                ? "col content_open admin__position"
                : "col content_close admin__position"
            }
          >
            <div className="row">
              <AdminNavbar />
              <Tabs
                defaultActiveKey="Header Code"
                id="headerTab"
                className="mt-3 ms-3"
              >
                <Tab eventKey="Header Code" title="Header Code" className="">
                  <HeaderCode />
                </Tab>
                <Tab eventKey="font style" title="font style" className="">
                  <FontSetting />
                </Tab>
                <Tab eventKey="sidebar_visible" title="sidebar_visible" className="">
                  <SidebarVisible />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_GeneralSettingsPage;
