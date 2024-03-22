/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./Login_Register.css";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Url } from "../../../url";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

const LoginPage = ({ showLogin, hideLogin }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [registerError, setRegisterError] = useState(false);
  const [loginError, setloginError] = useState("");
  const [registerErrMsg, setRegisterErrMsg] = useState(null);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setloginError(null);
    setRegisterError(false);
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string().required("Password is a required field"),
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least one letter, one number, one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (isLoginForm) {
        await axios.post(`${Url}api/user/login`, values);
        setloginError("login");
      } else {
        await axios.post(`${Url}api/user/register`, values);
        setSubmitting(true);
        setRegisterError(false);
        hideLogin();
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setRegisterErrMsg("Email ID already exists");
        setRegisterError(true);
      } else if (err.response && err.response.status === 408) {
        setRegisterErrMsg("Username already registered");
        setRegisterError(true);
      } else if (err.response && err.response.status === (400 || 404)) {
        setloginError("invalid");
        setTimeout(() => {
          setloginError(null);
          resetForm(); // Reset the form fields to empty
        }, 3000);
      } else {
        console.log(err);
        setRegisterErrMsg("Try again, something went wrong");
        setRegisterError(true);
        setloginError("invalid");
        setTimeout(() => {
          setloginError(null);
          resetForm(); // Reset the form fields to empty
        }, 3000);
      }
    }
  };
  return (
    <Modal
      show={showLogin}
      onHide={() => {
        hideLogin();
        setloginError(false);
        setRegisterError(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{isLoginForm ? "Sign In" : "Register"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoginForm ? (
          <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              handleSubmit(values, { setSubmitting: () => {} });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit} className="myform model-style">
                <div className="text-center">
                  {loginError === "invalid" ? (
                    <FaLock size={25} className="lock-invalid" />
                  ) : loginError === "login" ? (
                    <FaLockOpen size={25} className="lock-success" />
                  ) : (
                    <FaLock size={25} />
                  )}
                </div>
                <div className="form-group my-2">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email id"
                    className="form-control inp_text"
                    id="email"
                  />
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="form-group my-2">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    className="form-control"
                  />
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <div className="form-group my-2">
                  <p className="">Forgot password?</p>
                </div>
                <div className="col-md-12 d-grid text-center mb-2">
                  <Button
                    type="submit"
                    className="btn  btn-block mybtn btn-primary tx-tfm"
                  >
                    Login
                  </Button>
                </div>
                <p className="text-center">
                  Don't have an account?{" "}
                  <span
                    className="link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    style={{ cursor: "pointer" }}
                    onClick={toggleForm}
                  >
                    Sign up here
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values, { setSubmitting: () => {} });
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="myform model-style">
                {registerError && (
                  <div className="errorBlock">{registerErrMsg}</div>
                )}
                <Form.Group controlId="formBasicUsername" className="mb-2">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-2">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-2">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicConfirmPassword"
                  className="mb-2"
                >
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary btn-block" type="submit">
                    Register
                  </Button>
                </div>
                <p className="text-center mt-2">
                  Already have an account?{" "}
                  <span
                    className="link-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    style={{ cursor: "pointer" }}
                    onClick={toggleForm}
                  >
                    Sign in here
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginPage;
