import React, { useEffect, useState } from 'react'
import { RiArrowDropRightFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Products from '../Products'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'
import { useSelector } from 'react-redux'
import Login from '../../Components/Login/Login'
const Menzeshler = ({id, cat, subCat, title}) => {
    console.log(id,' ',cat,' ',subCat,' ',title);
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/product/similar/${id}`);
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
        setLoading(true)
    }, [id])
    const profileShow = useSelector(state => state.profileShow.profileShow)
    const [hasabymModal, setHasabymModal] = useState(false)
    return (
        <div className='w-full'>
            {
                !profileShow && hasabymModal && <div>
                    <Login setHasabymModal={setHasabymModal} />
                </div>
            }
            <Link to={subCat ? `/category?cat=${cat}&subCat=${subCat}&title=${title}` : `/category?cat=${cat}&title=${title}`}><p className='mb-2 mt-2 md:mt-10 text-center text-2xl font-bold'>MEŇZEŞLER</p></Link>
            <div className='w-full flex justify-end items-center my-2'>
                <Link to='/new' className='flex items-center hover:text-red-600'>
                    <RiArrowDropRightFill className='text-3xl' />
                    <h1 className='md:text-md md:font-bold pr-1'>Hemmesi</h1>
                </Link>
            </div>
            {loading ? <Loading loading={loading} /> : <div className='w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4'>
                {data && data.map(e => (
                    <Products e={e} key={e.id} setHasabymModal={setHasabymModal} />
                ))
                }
            </div>}
        </div>
    )
}

export default Menzeshler