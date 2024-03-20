/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

import { MDBInputGroup, MDBIcon } from 'mdb-react-ui-kit';
import SideContent from '../SideContent/SideContent';
import axios from 'axios';
import { Url } from '../../url';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import Select from 'react-select';


const SearchPage = () => {
    const { word } = useParams();



    const [data, setData] = useState([])

    const [selectedOption, setSelectedOption] = useState(null);

    const [search, setSearch] = useState("")

  

    // const handleSelectChange = (event) => {
    //     setSelectedValue(event.target.value);
    // };


    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/${search}`, { replace: true })
        }
    };

    const options = [
        { value: 'all', label: 'All results' },
        { value: 'articles', label: 'Articles' },
        { value: 'events', label: 'Events' },
        { value: 'newsletter', label: 'Newsletter' },
        { value: 'Videos', label: 'Videos' },
    ];

    const searchApi = async () => {
        try {
            const res = await axios.get(`${Url}api/search/${word}`)
            if (res.status == 404) {
                return setData([])
            }

            setData(res.data)

        } catch (err) {
            console.log(err)
            setData([])
        }

    }

  
      


    useEffect(() => {
        searchApi()
    }, [word])

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-8 mt-3"><div className="d-flex justify-content-center">
                        <MDBInputGroup style={{ zIndex: 0 }}>
                            <input type="search" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." onKeyDown={handleKeyDown} />
                            <button className="btn btn-primary" onClick={() => navigate(`/search/${search}`, { replace: true })}>
                                <MDBIcon icon='search' />
                            </button>
                        </MDBInputGroup>
                    </div>
                        <h3 className="mt-3 text-center text-bold">{data.length} Search results for "{word}" </h3>

               <div style={{width:200}}>
               <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}

    />
               </div>
                       

                        <div className="row mt-3">

                            {data.length > 0 && <Pagination data={data} />}



                        </div>
                    </div>
                    <SideContent />
                </div>

            </div>
        </>
    )
}

export default SearchPage