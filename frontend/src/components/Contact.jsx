/* eslint-disable react/jsx-no-target-blank */

import { Button, Form } from "react-bootstrap";
import MyNavbar from "./Header/Navbar";
import Footer from "./Footer/Footer";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <MyNavbar />
<div className="main-content__position">
      <div className="container mt-5">
        <div className="row row-contact-text">
          <div className="col-sm-12 font-text">
            <h1 style={{ textAlign: "left" }}>
              <span style={{ fontFamily: "helvetica, arial, sans-serif" }}>
                RACE EDITORIALE LLP.
              </span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 font-text">
            <h2 className="contact-leave-message">Send a Message</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-2">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mt-2">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>

              <Button
                style={{ backgroundColor: "#ff7275", border: "none" }}
                type="submit"
                className="mt-3 "
              >
                Submit
              </Button>
            </Form>
          </div>
          <div className="col-sm-6 col-xs-12 contact-right">
            <div className="contact-item">
              <div className="col-sm-2 col-xs-2 contact-icon">
                <i className="icon-phone" aria-hidden="true"></i>
              </div>
              <div className="col-sm-10 col-xs-10 contact-info">
                044 4283 4054, +91 8072098352, +91 9962110101
              </div>
            </div>
            <div className="contact-item">
              <div className="col-sm-2 col-xs-2 contact-icon">
                <i className="icon-envelope" aria-hidden="true"></i>
              </div>
              <div className="col-sm-10 col-xs-10 contact-info">
                info@raceautoindia.com
              </div>
            </div>
            <div className="contact-item">
              <div className="col-sm-2 col-xs-2 contact-icon">
                <i className="icon-map-marker" aria-hidden="true"></i>
              </div>
              <div className="col-sm-10 col-xs-10 contact-info">
                43, Butt Rd, Rajeswari colony, St.Thomas Mount, Ramapuram, Tamil
                Nadu 600016
              </div>
            </div>
            <div className="col-sm-12 contact-social">
              <ul>
                <li>
                  <a
                    className="facebook"
                    href="https://www.facebook.com/profile.php?id=100091859190540"
                    target="_blank"
                  >
                    <i className="icon-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    href="https://twitter.com/raceautoindia"
                    target="_blank"
                  >
                    <i className="icon-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="instagram"
                    href="https://www.instagram.com/race.auto.india/"
                    target="_blank"
                  >
                    <i className="icon-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="linkedin"
                    href="https://www.linkedin.com/company/race-auto-india/"
                    target="_blank"
                  >
                    <i className="icon-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="youtube"
                    href="https://www.youtube.com/@RaceAutoIndia"
                    target="_blank"
                  >
                    <i className="icon-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
