/* eslint-disable react/prop-types */

import Cookies from "js-cookie";
import ErrorPage from "./ErrorPage";

const PrivateRoute = ({ element }) => {
  const token = Cookies.get("token");

  if (!token || typeof token !== "string") {
    return <ErrorPage />;
  }

  try {
    const userTypeString = localStorage.getItem("userType");
    const userType = JSON.parse(userTypeString);

    if (userType[0].admin_panel === 0) {
      return element;
    } else {
      return <ErrorPage />;
    }
  } catch (error) {
    return <ErrorPage />;
  }
};

export default PrivateRoute;
