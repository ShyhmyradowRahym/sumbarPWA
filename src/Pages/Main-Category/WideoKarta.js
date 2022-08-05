import React, { useEffect, useState } from 'react'
import { RiArrowDropRightFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Products from '../Products'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import Login from '../../Components/Login/Login'
import { useSelector } from 'react-redux'
const WideoKarta = () => {
    const [data, setData]=useState(null)
    const [loading, setLoading]=useState(true)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('/main-page/categories?category=2&subCategory=5');
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
        setLoading(true)
    }, [])
    const profileShow = useSelector(state => state.profileShow.profileShow)
    const [hasabymModal, setHasabymModal] = useState(false)
    return (
        <div className='w-full'>
            {
                !profileShow && hasabymModal && <div>
                    <Login setHasabymModal={setHasabymModal} />
                </div>
            }
            {loading ? <Loading loading={loading} /> :<div className='w-full flex justify-center items-center my-2'>
                <Link to='/category?cat=2&subCat=5&title=wideo-kartalar' className='flex items-center hover:text-red-600'>
                    <RiArrowDropRightFill className='text-4xl' />
                    <h1 className='md:text-xl md:font-bold'> WIDEO KARTALAR</h1>
                </Link>
            </div>}
            {loading ? <Loading loading={loading} />: <div className='w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4'>
                {data && data.map(e => (
                    <Products e={e} key={e.id} setHasabymModal={setHasabymModal} />
                ))
                }
            </div>}
        </div>
    )
}

export default WideoKarta