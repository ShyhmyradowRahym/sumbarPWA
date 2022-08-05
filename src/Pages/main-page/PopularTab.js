import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Products from '../Products'
import Loading from '../../Components/Loading/Loading'
const PopularTab = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('/main-page/popular');
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
        setLoading(true)
    }, [])
    return (
        <div>
            {loading ? <Loading loading={loading} /> : <div className='w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4'>
                {data && data.map(e => (
                    <Products e={e} key={e.id} />
                ))
                }
            </div>}
        </div>
    )
}

export default PopularTab