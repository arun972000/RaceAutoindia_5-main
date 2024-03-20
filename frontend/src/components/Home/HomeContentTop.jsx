import Ad_1 from "../Ads/Ad_1"
import BreakingNews from "../BreakingNews/breakingNews"
import Features from "../Features/Features"
import HomeBannerV3 from "./HomeBannerv3/HomeBannerV3"
import HomeBannerV4 from "./HomeBannerv4/HomeBannerV4"
import HomeBannerV2 from "./Homebanner_v2/HomeBannerV2"




const HomeContentTop = () => {
    return (
        <>
            <div className="row mt-3">
                <div className="col-12">
                    <BreakingNews />
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <Ad_1 />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    {/* <HomeBanner /> */}
                    {/* <HomeBannerV2/> */}
                    <HomeBannerV3 />
                    {/* <HomeBannerV4/> */}

                </div>
            </div>

            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <Ad_1 />
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-4">
                    <Features />
                </div>
            </div>
        </>
    )
}

export default HomeContentTop