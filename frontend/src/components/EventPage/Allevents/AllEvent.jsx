
import PopularEvent from './PopularEvent'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'
import BusinessEvent from './BusinessEvent'
import FestivelEvent from './FestivelEvent'
import { Link } from 'react-router-dom'
import "./event.css"


const AllEvent = () => {
    return (
        <>
            <div className="col-12">
                <PopularEvent />
                <div className="text-center mt-4 mb-5">
                    <Link to="/eventlist/Popular"><button className="readMore__btn">View More  <MdKeyboardDoubleArrowDown /></button></Link>
                </div>
                <hr />
            </div>
            <div className="col-12">
                <BusinessEvent />
                <div className="text-center mt-4 mb-5">
                    <Link to="/eventlist/Business"><button className="readMore__btn">View More  <MdKeyboardDoubleArrowDown /></button></Link>
                </div>
                <hr />
            </div>
            <div className="col-12">
                <FestivelEvent />
                <div className="text-center mt-4 mb-5">
                    <Link to="/eventlist/Festival"><button className="readMore__btn">View More  <MdKeyboardDoubleArrowDown /></button></Link>
                </div>
                <hr />
            </div>
        </>
    )
}

export default AllEvent