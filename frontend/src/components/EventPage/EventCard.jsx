/* eslint-disable react/prop-types */

import Card from 'react-bootstrap/Card';
import "./EventCard.css"
import { Link } from 'react-router-dom';
import { Url } from '../../url';


function EventCard({ item }) {
    
    return (
        <div className="col-md-6 card_outer mb-3">
            <Card style={{ width: '18rem' }} className="event-card">
                <Card.Img variant="top" src={`${Url}eventsUpload/${item.image_url}` } style={{ objectFit: 'cover', aspectRatio: '16/9' }} className="img__card" />
                <Card.Body>
                    <Card.Title className="card__title">{item.title.slice(0,18)}....</Card.Title>
                   <p >Material Design is a visual programming...</p>
                   <Link to={`/eventpage/${item.title}`}><div className="card__read-more text-center pt-2">
                        Read More
                    </div></Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EventCard;