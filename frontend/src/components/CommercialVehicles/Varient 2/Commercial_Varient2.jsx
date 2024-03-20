import { FeaturesJson, businessJson } from "../../json/json"
import Commercial_v2_subcard1 from "./Commercial_v2_subcard1"
import Commercial_v2_subcard2 from "./Commercial_v2_subcard2"


const Commercial_Varient2 = () => {
  const data1 = businessJson.map(item => (<Commercial_v2_subcard1 key={item.id} item={item} />))
  const data = FeaturesJson.map(item => (<Commercial_v2_subcard2 key={item.id} item={item} />))
  return (
    <>
      {data1}
      
      {data}

      
    </>
  )
}

export default Commercial_Varient2