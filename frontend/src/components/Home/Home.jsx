

import SideContent from "../SideContent/SideContent"
import HomeContentMiddle from "./HomeContentMiddle"
import HomeContentTop from "./HomeContentTop"


const Home = () => {
    return (
        <>
            {/* <TopLogo /> */}
            {/* <MyNavbar /> */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <HomeContentTop />
                        <div className="row">
                            <div className="col-md-8">
                                <HomeContentMiddle />
                            </div>
                            <SideContent />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home