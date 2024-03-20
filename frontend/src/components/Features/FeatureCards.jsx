/* eslint-disable react/prop-types */


import './FeatureCards.css';

const FeatureCards = ({ item }) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthIndex = date.getMonth();
        const month = months[monthIndex];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };


    return (
        <div className="card border-0 bg-transparent position-relative">
            <div className="image-container">
                <img
                    src={`https://raceautoindia.com/${item.image_mid}`}
                    alt="Card image cap"
                    className="feature-card__image"
                    style={{ aspectRatio: "16/9", objectFit: "fill", borderRadius: 0 }}
                />
            </div>
            <div className="card-body">
                <h6 className="card-title mt-3">{item.title.slice(0, 50)}...</h6>

                <p className="card-text">{formatDate(item.created_at)}</p>
            </div>
            {/* <div className="label">Label Over Image</div> */}
        </div>
    );
};

export default FeatureCards;

