/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { Url } from "../../url"
import NavSubCategory from "./NavSubCategory"


const NavMainCategory = ({ item, active, setActive }) => {


    const [data, setData] = useState([])

    const SubCategory = async () => {
        try {
            const res = await axios.get(`${Url}api/category/main_sub/${item.name}`)
            setData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        SubCategory()
    }, [])

    const sub_Category = data.map(item => (<NavSubCategory item={item} key={item.id} />))
    return (
        <li className="nav-item dropdown mx-2">
            <a className={active == item.name ? "nav-link dropdown-toggle border_bottom active-nav" : "nav-link dropdown-toggle border_bottom"} href="#" onClick={() => setActive(item.name)}>
                {item.name.toUpperCase()}
            </a>
            <div className="dropdown-menu">
                {sub_Category}
            </div>
        </li>
    )
}

export default NavMainCategory