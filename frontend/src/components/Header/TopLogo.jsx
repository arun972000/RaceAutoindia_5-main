import "./TopLogo.css"
import logo from "/src/assets/raceindialogo.svg"

import { IoMdLogIn } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { FaHome } from "react-icons/fa";


const TopLogo = () => {
    return (
        <>
            <div className="f1">


                <div className="container">
                    <div className="row ">
                        <div className="col-12">
                            <div className="">
                                <div className="contact_about">
                                    <p>Contact</p>
                                    {/* <p>About us</p> */}
                                </div>  
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="f2">

                <div className="d-flex my-2 justify-content-center">
                    <img src={logo} className="img-fluid mx-2 greyscale__logo" alt="Responsive image" width="130px" height="auto" />
                </div>
                <div className="bottom-menu-position">
                    <div className="bottom-bar d-flex justify-content-evenly py-2">
                        <FaHome className="bottom__icon" size={30} />
                        <IoMdSearch className="bottom__icon" size={30} />
                        <IoMdLogIn className="bottom__icon" size={30} />
                        <CgProfile className="bottom__icon" size={30} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default TopLogo