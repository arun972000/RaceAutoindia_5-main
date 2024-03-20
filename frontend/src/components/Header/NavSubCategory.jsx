/* eslint-disable react/prop-types */

const NavSubCategory = ({ item }) => {
    return (
        <>

            <a className="dropdown-item" href="#">{item.name.toUpperCase()}</a>
        </>
    )
}

export default NavSubCategory