import React, { useEffect, useState } from 'react'
import { AiOutlineZoomIn } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { data } from '../Components/monitorData'
import AOS from 'aos';
import "aos/dist/aos.css";
const Notebooks = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
        AOS.refresh();
    }, []);
    return (
        <div className='w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4'>
            {data.map(e => (
                <div data-aos="fade"
                    className='relative m-0 border-2 p-1' >
                    <div className='flex items-center justify-end'>
                        <div className='flex items-center md:border-2 rounded-md px-1'>
                            <input className='md:mr-1' id='denesdir' type={'checkbox'} />
                            <label htmlFor='denesdir' className='md:block hidden'>Denesdirmek</label>
                        </div>
                        <AiOutlineZoomIn className='text-xl mx-1' />
                        <AiOutlineHeart className='text-xl text-red-500' />
                    </div>
                    <div className='absolute overflow-hidden text-center w-16 h-16' style={{ top: '-1px', left: '-1px' }}>
                        <span className='text-sm text-white bg-red-500 absolute block text-center transform -rotate-45' style={{ width: '10rem', left: '-3.5rem', top: '1rem' }}>
                            Taze
                        </span>
                    </div>
                    <img src={e.img} />
                    <div className='flex flex-col items-center'>
                        <h1 className='text-center px-1 h-20'>{e.title}</h1>
                        <p className='w-12 h-0.5 bg-red-500'></p>
                        <div className='flex justify-center my-1 items-center'>
                            <p className='font-bold mr-1'>{e.price}.00</p>
                            <span className=''>TMT</span>
                        </div>
                        <button className='mb-2 bg-red-600 text-xs px-4 py-2 text-white rounded-2xl transition duration-500 hover:bg-black'>
                            SEBEDE GOS
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notebooks
