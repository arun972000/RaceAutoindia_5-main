/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios"
import { Row } from "react-bootstrap"
import { Url } from "../../url"
import Varient1 from "../Post_varients/Varient 1/Varient1"
import Varient2 from "../Post_varients/Varient 2/Varient2"
import Varient3 from "../Post_varients/Varient 3/Varient3"
import Varient4 from "../Post_varients/Varient 4/Varient4"
import Ad_1 from "../Ads/Ad_1"
import { useEffect, useState } from "react"
import Varient5 from "../Post_varients/Varient 5/Varient5"

const HomepageCategory = ({ item }) => {

  const [data, setData] = useState([])

  const [v3single, setv3single] = useState({
    title: "",
    image: "",
    date: ""
  })

  const CategoryList = async () => {
    try {
      const res = await axios.get(`${Url}api/post/main-sliced/${item.name}`)
      setData(res.data[0])
      setv3single(res.data[0][0])
      console.log()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    CategoryList()
  }, [])



  const v2data = data.slice(0, 6)

  const v3data = data.slice(0, 4)

 



  return (
    <>
      <h6 className="mt-4"><span style={{ backgroundColor: item.color, padding: 5, color: "white" }}>{item.name.toUpperCase()}</span></h6>

      <Row>
        {item.block_type == "block-1" && data.map(item => (<Varient1 item={item} key={item.id} />)).slice(0, 3)}
        {item.block_type == "block-2" && <Varient3 item={v3data} single={v3single} />}
        {item.block_type == "block-3" && <Varient2 item={v2data} />}       
        {item.block_type == "block-4" && <Varient5 item={v3data} single={v3single} />}
        {item.block_type == "block-5" && data.map(item => (<Varient4 key={item.id} item={item} />)).slice(0, 2)}
      </Row>
      <div className="col-12 mt-3 d-flex justify-content-center">
        <Ad_1 />
      </div>

    </>
  )
}

export default HomepageCategory