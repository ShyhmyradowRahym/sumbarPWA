import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RiCloseLine } from "react-icons/ri";
import { AiOutlinePlus } from 'react-icons/ai'
import { HiMinusSm } from 'react-icons/hi'
import { AiFillCaretRight } from 'react-icons/ai'
import { addCart, delItemToCart, emptyCart } from '../Features/cartSlice';
import { BsSearch } from 'react-icons/bs'
import { welayatlar } from '../Components/welayatlar'
import AOS from 'aos';
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Corzina() {
    let { title } = useParams()
    const cartProducts = useSelector(state => state.cart.cartProducts)
    const dispatch = useDispatch()
    const [data, setData] = useState(0)
    let t = 0
    cartProducts.map(e => {
        t = t + (e.quantity * e.product.price)
    })
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: "true"
        });
        AOS.refresh();
    }, []);
    const [check, setCheck] = useState(0)
    useEffect(() => {
        data == 0 && setCheck(0)
    }, [data])
    const add = () => toast.success('haryt goşuldy', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    
    const del = () => toast.error('haryt ayryldy', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    return (
        <div
            data-aos="fade"
            className='md:w-3/4 w-full mt-5'>
                <ToastContainer />
            <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>SEBEDIM</h1>
            <div className='hidden md:flex items-center w-full h-16 border-2 bg-white'>
                <div className='w-3/4 flex items-center'>
                    <p className='ml-4'>Haryt</p>
                </div>
                <div className='w-2/4 flex items-center justify-between pr-3'>
                    <p>Sany</p>
                    <p>Jemi</p>
                    <RiCloseLine onClick={() => dispatch(emptyCart())} className='bg-gray-200 text-gray-400 text-xl cursor-pointer' />
                </div>
            </div>
            {cartProducts.length === 0 && <div className='flex justify-center aling-center items-center flex-col w-full my-20'>
                <BsSearch className='text-4xl text-red-500' />
                <p className='font-bold text-xl'>Haryt tapylmady</p>
            </div>}
            {
                cartProducts.map(e => (
                    <div className='flex items-center w-full h-20 border-2 md:border-t-0 bg-white'>
                        <div className='w-3/4 flex items-center'>
                            <img src={e.product.imageUrl[0]} className='h-16 w-20 md:mx-4 mx-1' />
                            <p className='md:text-md text-sm'>{e.product.title}</p>
                        </div>
                        <div className='w-2/4 flex items-center justify-between pr-3'>
                            <div className='flex md:flex-row flex-col items-center'>
                                <HiMinusSm onClick={() => {dispatch(addCart({ quantity: e.quantity > 1 && e.quantity - 1, product: e.product })); del()}} className='bg-gray-200 text-lg md:text-2xl p-0.5 text-gray-400 cursor-pointer' />
                                {e.quantity == 0 ? <p className='mx-2 text-red-400 font-bold'>0</p> : <p className='md:mx-2 text-red-400 font-bold'>{e.quantity}</p>}
                                <AiOutlinePlus onClick={() => {dispatch(addCart({ quantity: e.quantity + 1, product: e.product })); add()}} className='bg-gray-200 text-gray-400 p-0.5 text-lg md:text-2xl cursor-pointer' />
                            </div>
                            <p className='md:text-md text-sm'>{e.quantity * e.product.price} {' '} TMT</p>
                            <RiCloseLine onClick={() => {dispatch(delItemToCart(e.product.id)); del()}} className='bg-gray-200 text-gray-400 text-xl md:text-xl cursor-pointer' />
                        </div>
                    </div>
                ))
            }
            <div className='md:mx-0 px-3 w-full md:w-1/2 float-right mt-8'>
                <form>
                    <div className='mb-2'>
                        <label for="countries" className="block mb-2 text-md font-medium text-gray-900">Eltip bermek üçin şäheriňiz <span className='text-red-500'>*</span></label>
                        <select onChange={(e) => setData(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-500 focus:border-red-500 block w-full p-2">
                            {welayatlar.map((e, k) => (
                                <option value={k}>{e.title}</option>
                            ))}
                        </select>
                        {welayatlar[data].data.length > 0 && <select onChange={(e) => setCheck(e.target.value)} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-500 focus:border-red-500 block w-full p-2">
                            {welayatlar[data].data.map((e, k) => (
                                <option value={k}>{e}</option>
                            ))}
                        </select>}
                    </div>
                    <div class="relative overflow-x-auto shadow-md mb-4">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" class="px-6 py-4">
                                        Harytlar
                                    </th>
                                    <th scope="col" class="px-6 py-4">
                                        {t} TMT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b odd:bg-white even:bg-gray-200">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Eltip bermek
                                    </th>
                                    <td class="px-6 py-4">
                                        0 TMT
                                    </td>
                                </tr>
                                <tr class="border-b odd:bg-white even:bg-gray-200">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Jemi
                                    </th>
                                    <td class="px-6 py-4 text-red-500">
                                        {t} TMT
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link to={`/order?p=${data}&l=${check}`} className='cursor-pointer mb-4 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                        <AiFillCaretRight />
                        <p>Sargyt et</p>
                    </Link>
                </form>
            </div >
        </div >
    )
}

export default Corzina