/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import EventPage from "../EventPage"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Url } from "../../../url"

import TopLogo from "../../Header/TopLogo"

import SideContent from "../../SideContent/SideContent"
import MyNavbar from "../../Header/Navbar"


const Layout3 = () => {

    const { title } = useParams()


    const [data, setData] = useState([])

    const fetchApi = async () => {
        try {
            const res = await axios.get(`${Url}api/event/data/${title}`)
            setData(res.data)
        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        fetchApi()
    }, [title])
    return (
        <>
            <TopLogo />
            <MyNavbar />

            <div className="row mt-3 me-2">
                <div className="col-md-3">
                    <div style={{ width: 300, height: 250 }}></div>
                </div>
                <div className="col-md-6">
                    <div className="row">

                        <EventPage item={data} />

                    </div>
                    

                </div>
                <SideContent />
            </div>
        </>
    )
}

export default Layout3