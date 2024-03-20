import AdminNavbar from "./Admin Navbar/Navbar"
import EventPost from "./EventPost/EventPost"
import SideBar from "./Sidebar"



const Admin_Event = () => {
  return (
    <>
      <div className="container-fluid custom-container-fluid">
        <div className="row d-flex">
          <SideBar />
          <div className="col admin__position">
            <div className="row">
              <AdminNavbar />
              <EventPost />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin_Event