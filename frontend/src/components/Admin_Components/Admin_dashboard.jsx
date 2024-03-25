import AdminNavbar from "./Admin Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";

import SideBar from "./Sidebar";

const Admin_dashboard = () => {
  return (
    <>
      <div className="container-fluid custom-container-fluid">
        <div className="row d-flex">
          <SideBar />
          <div className="col admin__position">
            <div className="row">
              <AdminNavbar />
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_dashboard;
