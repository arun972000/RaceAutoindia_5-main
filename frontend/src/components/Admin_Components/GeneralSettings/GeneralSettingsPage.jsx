/* eslint-disable react/prop-types */
import { Tab, Tabs } from "react-bootstrap";
import AdminNavbar from "../Admin Navbar/Navbar";
import SideBar from "../Sidebar";
import HeaderCode from "./HeaderCode";

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
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_GeneralSettingsPage;