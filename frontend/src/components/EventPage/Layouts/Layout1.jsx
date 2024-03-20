
import EventCarosel from '../EventCarosel/EventCarosel'
import AllEvent from '../Allevents/AllEvent'
import TopLogo from '../../Header/TopLogo'
import SideContent from '../../SideContent/SideContent'
import MyNavbar from '../../Header/Navbar'


const Layout1 = () => {
    return (
        <>
            <TopLogo />
            <MyNavbar />
            <div className="row">
                <div className="col-12">
                    <EventCarosel />
                </div>
            </div>

            <div className="row mt-3 me-2">
                <div className="col-md-3">
                    <div style={{ width: 300, height: 250 }}></div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-evenly">
                        <AllEvent />
                    </div>
                </div>
                <SideContent/>
            </div>
        </>
    )
}

export default Layout1