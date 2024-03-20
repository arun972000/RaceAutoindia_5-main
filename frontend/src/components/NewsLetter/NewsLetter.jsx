
// import YearSelectorComponent from "./Tabs"
import "./NewsLetter.css"
import { useEffect, useState } from "react"

import axios from "axios"
import LetterCard from "./LetterCard.jsx"
import { Url } from "../../url.js"



const NewsLetter = () => {

    const [data, setData] = useState([])

    const apiCall = async () => {
        try {
            const res = await axios.get(`${Url}api/newsletter`)
            setData(res.data)

        } catch (err) {
            console.log(err)
        }
    }
    const Letters = data.map(item => (<LetterCard item={item} key={item.id} />))
    useEffect(() => {
        apiCall()
    }, [])

    return (
        <>
            {/* <TopLogo />
            <MyNavbar /> */}
            <div className="NewsLetter__bg pt-5">
                <div className="container">
                    {/* <YearSelectorComponent /> */}
                    <div className="row justify-content-center">
                        {Letters}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsLetter