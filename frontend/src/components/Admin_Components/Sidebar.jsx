import { MdEventAvailable } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { IoHome } from "react-icons/io5";



import "./sideBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleTrigger = () => setIsOpen(!isOpen);

    return (

        <div className="col-md-auto sidebar__position">
            <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
                <div className="trigger" onClick={handleTrigger}>
                    {isOpen ? <IoClose /> : <CiMenuBurger />}
                </div>

                <div className="sidebar-position">
                    <IoHome />
                    <span>Home</span>
                </div>
                <Link to="/admin_newsletter"> <div className="sidebar-position">
                    <IoIosMail />
                    <span>Newsletter</span>
                </div></Link>
                <Link to="/admin_event"><div className="sidebar-position">
                    <MdEventAvailable />
                    <span>Event</span>
                </div></Link>
            </div>
        </div>

    );
}

export default SideBar