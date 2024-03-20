
import { Col } from 'react-bootstrap'
import "./RightContent.css"

const RightContent = () => {
  return (
    <Col xl={3} className="mb-4">
   <h6 style={{backgroundColor:"grey",padding:5,color:"white"}}>SOCIAL MEDIA</h6>
 <div className="social-media">
    <div className="social-media__label mb-2 p-2" style={{backgroundColor:'#3b5998'}}>Facebook</div>
    <div className="social-media__label mb-2 p-2" style={{backgroundColor:' #FF0000'}}>Youtube</div>
    <div className="social-media__label mb-2 p-2" style={{backgroundColor:'#1DA1F2'}}>Twitter</div>
    <div className="social-media__label mb-2 p-2" style={{backgroundColor:'#0077B5'}}>Linkedin</div>
    <div className="social-media__label mb-2 p-2" style={{backgroundColor:'#405de6'}}>Instagram</div>
 </div>
  </Col>
  )
}

export default RightContent