import './ParallaxScroll.css';

const ParallaxScroll = () => {
    return (
        <>
            <div className="parallax d-flex align-items-center">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="text-white m-5">Here What’s In Battle field Animal Need Edition Neardummy text</h2>
                    </div>
                    <div className="col-lg-6 mt-5">
                        <h1 className="text-white">Parallax Scroll</h1>
                        
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card border-0 position-relative">
                                    <img
                                        src="http://raceautoindia.com/uploads/images/202310/image_750x_651ea3085f4b5.jpg"
                                        alt="Card Image 1"
                                        className="card-img"
                                    />
                                    <div className="card-text position-absolute bottom-0 start-0 w-100">
                                        <div className="black-bg-opacity">
                                            <h3 className="text-white m-3">Card Text 1</h3>
                                            <p className="post-date text-white m-3">Post Date: January 1, 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card border-0 position-relative">
                                    <img
                                        src="http://raceautoindia.com/uploads/images/202310/image_750x_651ea3085f4b5.jpg"
                                        alt="Card Image 1"
                                        className="card-img"
                                    />
                                    <div className="card-text position-absolute bottom-0 start-0 w-100">
                                        <div className="black-bg-opacity">
                                            <h3 className="text-white m-3">Card Text 1</h3>
                                            <p className="post-date text-white m-3">Post Date: January 1, 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default ParallaxScroll;

