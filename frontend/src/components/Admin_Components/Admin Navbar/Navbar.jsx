import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    Cookies.remove("token");
    localStorage.removeItem("userType");
    navigate("/");
    // Add your sign-out logic here
  };

  return (
    <div className="col-12">
      <Navbar bg="white" variant="white" className="shadow-sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto px-5">
            <Button variant="primary" className="me-5" onClick={()=>navigate("/")}>View Site</Button>
            <NavDropdown
              title={<FaUserCircle size={20} />}
              id="basic-nav-dropdown"
              drop="down-centered"
              style={{ backgroundColor: "white" }}
            >
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignOut}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;
