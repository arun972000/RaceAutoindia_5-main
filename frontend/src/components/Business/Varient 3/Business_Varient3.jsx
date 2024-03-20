import { Card, Col } from "react-bootstrap"

import { CommercialJson } from "../../json/json";
import Commercial_v1_subCard from "./Commerical_Varient1_card2";


const Business_Varient3 = () => {
    const currentDate = new Date().toLocaleDateString();
    return (
        <>



            <Col md={6}>
                <Card className="h-100 border-0">
                    <Card.Img
                        variant="top"
                        src="http://raceautoindia.com/uploads/images/202401/image_750x_65b755f51b26e.jpg"
                        alt="Sample"
                        style={{ aspectRatio: "16/9", objectFit: "fill", borderRadius: 0 }}
                    />
                    <Card.Body>
                        <Card.Title>Content 1</Card.Title>
                        <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Card.Text>
                        <p className="card-text text-muted small">Posted on : {currentDate}</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6}>
                {CommercialJson.map(item => (<Commercial_v1_subCard key={item.id} item={item} />))}
            </Col>

        </>
    )
}

export default Business_Varient3