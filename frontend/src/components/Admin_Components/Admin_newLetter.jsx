import AdminNavbar from "./Admin Navbar/Navbar"
import NewsLetterPost from "./NewsLetterForm/PostForm"
import SideBar from "./Sidebar"




const Admin_newLetter = () => {
    return (
        <>
            <div className="container-fluid custom-container-fluid">
                <div className="row d-flex">
                    <SideBar />
                    <div className="col admin__position">
                        <div className="row">
                            <AdminNavbar />

                            <NewsLetterPost />




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin_newLetter