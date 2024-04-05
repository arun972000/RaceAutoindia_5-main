/* eslint-disable react/prop-types */
import AdForm from "./Ad_space/Ad_Form";
import AdminNavbar from "./Admin Navbar/Navbar";

import SideBar from "./Sidebar";

const Admin_AdForm = ({ isOpen, handleTrigger }) => {
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
              <AdForm/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_AdForm;