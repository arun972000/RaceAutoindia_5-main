
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
    const handleSignOut = () => {
        // Add your sign-out logic here
    };

    return (
        <div className="col-12">
            <Navbar bg="white" variant="white" className="shadow-sm">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto px-5">
                        <NavDropdown title={<FaUserCircle size={20} />} id="basic-nav-dropdown" drop="down-centered" style={{backgroundColor:"white"}}>
                            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default AdminNavbar;
