/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../url";
import NavSubCategory from "./NavSubCategory";
import { Link } from "react-router-dom";

const NavMainCategory = ({ item, active, setActive }) => {
  const [data, setData] = useState([]);

  const SubCategory = async () => {
    try {
      const res = await axios.get(
        `${Url}api/category/main_sub/${item.name_slug}`
      );
      setData(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    SubCategory();
  }, []);

  const sub_Category = data.map((post) => (
    <NavSubCategory item={post} key={post.id} main_title={item.name_slug}/>
  ));
  return (
    <li className="nav-item dropdown mx-2">
      <Link
        to={`/category/${item.name_slug}`}
        className={
          active == item.name
            ? "nav-link dropdown-toggle border_bottom active-nav"
            : "nav-link dropdown-toggle border_bottom"
        }
        onClick={() => {
          setActive(item.name);
          sessionStorage.setItem('activeItem', item.name)
        
        }
        }
      >
        {item.name.toUpperCase()}
      </Link>
      <div className="dropdown-menu shadow-sm">{sub_Category}</div>
    </li>
  );
};

export default NavMainCategory;
