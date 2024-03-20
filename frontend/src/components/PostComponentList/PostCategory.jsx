import axios from 'axios'
import { Url } from '../../url.js'
import { useEffect, useState } from 'react'

import HomepageCategory from './HomepageCategory'

const PostCategory = () => {

    const [data, setData] = useState([])
    const category = async () => {
        try {
            const res = await axios.get(`${Url}api/category/categoryList`)
            setData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        category()
    }, [])

    const showHome = data.filter(item => item.show_at_homepage == 1).map(item => (<HomepageCategory key={item.id} item={item} />))
    return (
        <>
         { showHome }
        </>
       
    )
}

export default PostCategory