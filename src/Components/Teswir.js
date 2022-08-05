import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import _ from "lodash";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Modal from './BahaBermek/Modal';
import BahaModal from './BahaBermek/BahaModal';
import Rating from './Rating/Rating';
const Teswir = () => {
    const [showBaha, setShowBaha] = useState(false)
    const profileShow = useSelector(state => state.profileShow.profileShow)
    const handleBaha = () => {
        setShowBaha(true)
    }
    const [dataRev, setDataRev] = useState(null)
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('/site-reviews');
                setDataRev(res.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])
    return (
        <div>
            <p className='text-center my-2 font-bold md:mr-6 mr-0'>
                <Link onClick={() => window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })} className='text-black hover:text-red-600' to='/ratings'>TESWIRLER</Link>
            </p>
            <div className='border md:mr-6 mr-0 bg-white pb-2'>
                <div className='flex items-center'>
                    {
                        !profileShow && showBaha && <BahaModal setShowBaha={setShowBaha} />
                    }
                    {
                        profileShow && showBaha && <Modal setShowBaha={setShowBaha} />
                    }
                    <div className='p-2 w-1/2 flex flex-col justify-center'>
                        <p className='text-center text-red-600 font-bold text-4xl'>{dataRev && dataRev[2]}</p>
                        <div className='flex justify-center'>
                            <Rating widthRating={dataRev && (dataRev[2] * 100) / 5} />
                        </div>
                        <p className='text-center text-gray-500'>({dataRev && dataRev[1]})</p>
                    </div>
                    <div className='h-20 border bg-black'></div>
                    <div className='w-1/2 flex justify-center items-center'>
                        <button onClick={() => handleBaha()} className='py-2 px-1 text-red-600 transition duration-500 ease-in-out hover:text-white hover:bg-red-600 border border-red-600'>Baha berin</button>
                    </div>
                </div>
                <div className=''>
                    <div className='w-11/12 mx-auto bg-gray-300' style={{ height: '1px' }}></div>
                    {dataRev && dataRev[0].map((e, o) => (
                        <div key={o}>
                            <div className='mt-2 flex pl-3 items-center'>
                                {_.times(e.stars, () => (
                                    <AiFillStar className='text-yellow-500' />
                                ))}
                                <p className='text-sm ml-2'>{e.status}</p>
                            </div>
                            <div className='flex items-center pl-3'>
                                <IoPersonCircleSharp className='mr-1 text-lg text-gray-400' />
                                <p className='text-sm font-bold'>{e.name}</p>
                            </div>
                            <p className='pl-3 text-sm'>{e.review}</p>
                            <div className='w-11/12 my-2 mx-auto bg-gray-300' style={{ height: '1px' }}></div>
                        </div>
                    ))}

                    <Link onClick={() => window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })} to='/ratings'>
                        <p className='mx-2 rounded text-center py-1.5 px-1 transition duration-500 ease-in-out text-white hover:bg-black bg-red-600 '>
                            Ahli teswirler
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Teswir