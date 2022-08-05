import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { emptyEqual, showEqual } from '../Features/equalSlice';
function Equal() {
    const equalProducts = useSelector(state => state.equal.equalProducts)
    const dispatch = useDispatch()
    console.log(equalProducts);
    return (
        <div className='w-full text-white md:h-32 h-44 bg-gray-800 fixed bottom-0 z-10'>
            <div className='container h-full mx-auto grid lg:grid-cols-3 lg:grid-gap-3 grid-cols-1 grid-gap-1'>
                <div className='flex items-center justify-center h-full'>
                    <p className='mx-10 text-center text-gray-400 text-sm lg:text-md font-medium'>Haryt deňeşdirmek üçin goşuldy. Siz diňe 4 sany haryt goşup bilýäňiz.</p>
                </div>
                <div className='flex items-center justify-center'>
                    {equalProducts[0].e.imageUrl[0] && <img src={equalProducts[0].e.imageUrl[0]} className='lg:h-20 h-12 md:mx-2 mx-1' />}
                    {equalProducts[1] && equalProducts[1].e.imageUrl[0] ? <img src={equalProducts[1].e.imageUrl[0]} className='lg:h-20 h-12 md:mx-2 mx-1' /> : <img src='https://sumbar-computer.com/img/temp/product-xs.png' className='lg:h-20 h-12 md:mx-2 mx-1' />}
                    {equalProducts[2] && equalProducts[2].e.imageUrl[0] ? <img src={equalProducts[2].e.imageUrl[0]} className='lg:h-20 h-12 md:mx-2 mx-1' /> : <img src='https://sumbar-computer.com/img/temp/product-xs.png' className='lg:h-20 h-12 md:mx-2 mx-1' />}
                    {equalProducts[3] && equalProducts[3].e.imageUrl[0] ? <img src={equalProducts[3].e.imageUrl[0]} className='lg:h-20 h-12 md:mx-2 mx-1' /> : <img src='https://sumbar-computer.com/img/temp/product-xs.png' className='lg:h-20 h-12 md:mx-2 mx-1' />}
                </div>
                <div className='flex items-center justify-center'>
                    <div className='flex items-center justify-center'>
                        <Link to='/compare' onClick={() => dispatch(showEqual())} className='text-sm lg:text-lg px-4 md:px-4 lg:px-10 py-1 lg:py-1.5 md:py-0.5 hover:transition-all border transition ease-in-out delay-100 hover:bg-red-700 hover:text-white text-red-700 border-red-500 rounded'>Harytlary denesdirmek</Link>
                        <p onClick={() => dispatch(emptyEqual())} className='border border-gray-500 ml-1 cursor-pointer'>
                            <RiCloseLine className='text-2xl md:text-3xl lg:text-4xl text-gray-500' />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Equal
