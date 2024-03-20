import { Row } from "react-bootstrap"
import { businessJson } from "../json/json"

import Business_Varient4 from "./Varient 4/Business_Varient4"


const Business = () => {

    const data = businessJson.map(item => (<Business_Varient4 key={item.id} item={item} />))
    return (
        <>
            <h6><span style={{ backgroundColor: "#ba0000", padding: 5, color: "white" }}>BUSINESS</span></h6>
            <Row className="justify-content-evenly">
                {data}
            </Row>
        </>
    )
}

export default Business