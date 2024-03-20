
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import FeatureCards from './FeatureCards';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../url';


const Features = () => {

    const [data,setData]=useState([])

    const FeaturedApi=async()=>{
        try{
            const res=await axios.get(`${Url}api/post/featured`)
            setData(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        FeaturedApi()
    },[])

    return (
        <>
            <h6><span style={{ backgroundColor: "#ba0000", padding: 5, color: "white" }}>FEATURES</span></h6>
            <div className="row">
                {data.map(item => (<div key={item.id} className="col-md-6 col-lg-3">
                    <FeatureCards item={item} />
                </div>))}
            </div>
        </>
    );
};

export default Features;