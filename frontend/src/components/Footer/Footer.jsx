
import logo from "/src/assets/raceindialogo.svg"
import "./Footer.css"

const Footer = () => {
    return (
        <>
            <div className="footer mt-5 pb-2">
                <div className="container">
                    <div className="row ">
                        <div className="col-sm-12 mt-3 ">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <img src={logo} className="img-fluid" alt="Responsive image" width="120px" />
                                </div>
                                <div>
                                    <div className="social-icons">
                                        <i className="fab fa-facebook"></i>
                                        <i className="fab fa-twitter"></i>
                                        <i className="fab fa-instagram"></i>
                                        <i className="fab fa-linkedin"></i>
                                        <i className="fab fa-youtube"></i>
                                        <i className="fa-solid fa-rss"></i>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-sm-12 mt-2 ">
                            <p>Race Auto India is a B2B publication that offers insightful analysis on the latest news, views, and trends in the automotive industry and its associated sectors. With over 10 years of experience in the field of Commercial Vehicles, Logistics, and Market Research, the team at Race Auto India comprises distinguished experts who have a proven track record of delivering high-quality researched content</p>
                        </div>
                        <hr className="my-2" />
                        <div className="row">
                            <div className="col-12 col-md-4 ">
                        <p className="ms-4 text-center p-1">
                            Copyright 2024 Race Auto India - All Rights Reserved
                        </p>
                        </div>
                        <div className="col-6 col-md-4">
                        <p className="text-center p-1">
                            Privacy Policy
                        </p>
                        </div>
                        <div className="col-6 col-md-4">
                        <p className="text-center p-1">
                            Terms and Condition
                        </p>
                        </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Footer