/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const NavSubCategory = ({ item,main_title,}) => {
  return (
    <>
      <Link to={`/article/${main_title}/${item.name_slug}`} className="dropdown-item" >
        {item.name}
      </Link>
    </>
  );
};

export default NavSubCategory;
