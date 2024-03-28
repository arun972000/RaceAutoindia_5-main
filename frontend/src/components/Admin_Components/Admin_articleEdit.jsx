/* eslint-disable react/prop-types */
import AdminNavbar from "./Admin Navbar/Navbar";
import ArticleEdit from "./Article_post/ArticleEdit";

import SideBar from "./Sidebar";

const Admin_articleEdit = ({ isOpen, handleTrigger }) => {
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
              <ArticleEdit />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_articleEdit;