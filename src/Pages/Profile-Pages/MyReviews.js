import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { IoPersonCircleSharp } from 'react-icons/io5'
import service from '../../Components/Interceptors/axios'
import Loading from '../../Components/Loading/Loading'
import _ from "lodash";
import { useSelector } from 'react-redux'
const MyReviews = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            try {
                const res = await service.get('/users/reviews');
                setData(res.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
        setLoading(true)
    }, [])
    const profileShow = useSelector(state => state.profileShow.profileShow)
    useEffect(()=>{
        !profileShow && window.location.replace('/')
    },[])
    return (
        <div className='md:w-3/4 px-3 md:px-0 md:mt-5 mt-0 w-full flex flex-col'>
            <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>TESWIRLERIM</h1>
            <div className=''>
                {loading && <Loading loading={loading} />}
                {
                    data && data.map(e => (
                        <div className='border bg-white px-3'>
                            <p>{e.title}</p>
                            <div className='w-full mx-auto mt-2 flex justify-between items-center'>
                                <div className='flex items-center'>
                                    {_.times(e.stars, () => (
                                        <AiFillStar className='text-yellow-500' />
                                    ))}
                                    <p className='text-sm ml-2'>{e.status}</p>
                                </div>
                            </div>
                            <div className='w-full mx-auto flex flex-col'>
                                <div className='flex items-center'>
                                    <IoPersonCircleSharp className='mr-1 text-lg text-gray-400' />
                                    <p className='text-sm font-bold'>{e.name}</p>
                                </div>
                                <p className='pb-2 text-sm'>{e.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {data && data.length === 0 &&
                < div className='flex justify-center aling-center items-center flex-col w-full my-20'>
                    <BsSearch className='text-4xl text-red-500' />
                    <p className='font-bold text-xl'>Haryt tapylmady</p>
                </div>
            }
        </div >
    )
}

export default MyReviews