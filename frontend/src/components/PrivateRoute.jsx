/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";

import ErrorPage from "./ErrorPage";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);



  if (decoded.status == 1) {
    return element;
  } else {
    return <ErrorPage/>;
  }
};

export default PrivateRoute;
