import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import AOS from 'aos';
import "aos/dist/aos.css";
import Products from './Products'
import axios from 'axios'
import Paginate from '../Components/Paginate/Paginate';
import Loading from '../Components/Loading/Loading';
import Login from '../Components/Login/Login';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
function All() {
    const navigate = useNavigate()
    const [filter, setFilter] = useState('Elipbiy boyunca')
    const [show, setShow] = useState(false)

    const [showPag, setShowPag] = useState(false)
    const [pag, setPag] = useState(40)
    const showFilter = () => {
        setShow(!show)
    }
    const handleShowPag = () => {
        setShowPag(!showPag)
    }
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
        AOS.refresh();
    }, []);
    const [data, setData] = useState(null)
    const [pageCount, setPageCount] = useState(1);
    const handlePageClick = (data) => {
        setPageCount(data.selected + 1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    const [loading, setLoading] = useState(true)
    const [query, setQuery]=useState('')
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/product/all?page=${pageCount}&take=${pag}${query}`);
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
        setLoading(true)
    }, [pageCount, pag, query])
    const profileShow = useSelector(state => state.profileShow.profileShow)
    const [hasabymModal, setHasabymModal] = useState(false)
    return (
        <div className='md:w-3/4  w-full md:mt-5 mt-0'>
            <h1 className='mb-4 mt-2 md:mt-5 text-center text-2xl font-bold'>ÄHLI HARYTLAR</h1>
            <div className='sm:mx-0 mx-3 my-5 flex items-center justify-between'>
                <p className=''>Haryt: {data && data.meta.itemCount}</p>
                <div className='flex'>
                    <div className='relative'>
                        <div onClick={() => showFilter()} className='hover:bg-gray-300 transition delay-200 flex items-center px-3 py-1 border-2 text-sm cursor-pointer'>
                            <p>{filter}</p>
                            <FaAngleDown />
                        </div>
                        {show &&
                            <div className="absolute z-10 w-36 right-0 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="text-xs text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li onClick={() => {setQuery(''); setFilter('Elipbiy boyunca'); showFilter(false) }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Elipbiy boyunca' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Elipbiy boyunca</p>
                                        {filter == 'Elipbiy boyunca' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {setQuery(''); setFilter('Basda arzanladyslar'); showFilter(false) }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Basda arzanladyslar' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Basda arzanladyslar</p>
                                        {filter == 'Basda arzanladyslar' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {
                                        navigate({
                                            search: createSearchParams({
                                                popular: "true"
                                            }).toString()
                                        }); 
                                        setQuery('&popular=true');
                                        setFilter('Meshurlar'); showFilter(false)
                                    }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Meshurlar' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Meshurlar</p>
                                        {filter == 'Meshurlar' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {
                                        navigate({
                                            search: createSearchParams({
                                                
                                            }).toString()
                                        }); 
                                        setQuery('');
                                        setFilter('Tazeden kona'); showFilter(false)
                                    }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Tazeden kona' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Tazeden kona</p>
                                        {filter == 'Tazeden kona' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {
                                        navigate({
                                            search: createSearchParams({
                                                by: "price",
                                                order: "ASC"
                                            }).toString()
                                        });
                                        setQuery('&by=price&order=ASC')
                                        setFilter('Arzandan gymmada'); showFilter(false)
                                    }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Arzandan gymmada' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Arzandan gymmada</p>
                                        {filter == 'Arzandan gymmada' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {
                                        navigate({
                                            search: createSearchParams({
                                                by: "price"
                                            }).toString()
                                        });
                                        setQuery('&by=price')
                                        setFilter('Gymmatdan arzana'); showFilter(false)
                                    }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Gymmatdan arzana' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Gymmatdan arzana</p>
                                        {filter == 'Gymmatdan arzana' && <TiTick className='text-red-500' />}
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className='relative ml-1'>
                        <div onClick={() => handleShowPag()} className='hover:bg-gray-300 transition delay-200 flex items-center px-3 py-1 border-2 text-sm cursor-pointer'>
                            <p>{pag}</p>
                            <FaAngleDown />
                        </div>
                        {showPag &&
                            <div className="absolute z-10 w-16 right-0 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="text-xs text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li onClick={() => { setPag(40); handleShowPag(false) }} className='cursor-pointer flex w-full items-center hover:bg-gray-100'>
                                        <p className={pag === 40 ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>40</p>
                                        {pag === 40 && <TiTick className='ml-1 text-red-500' />}
                                    </li>
                                    <li onClick={() => { setPag(60); handleShowPag(false) }} className='cursor-pointer flex w-full items-center hover:bg-gray-100'>
                                        <p className={pag === 60 ? "cursor-pointer text-red-500 block py-1 pl-4 text-md" : "text-md cursor-pointer block py-1 pl-4"}>60</p>
                                        {pag === 60 && <TiTick className='ml-1 text-red-500' />}
                                    </li>
                                    <li onClick={() => { setPag(80); handleShowPag(false) }} className='cursor-pointer flex w-full items-center hover:bg-gray-100'>
                                        <p className={pag === 80 ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>80</p>
                                        {pag === 80 && <TiTick className='ml-1 text-red-500' />}
                                    </li>
                                    <li onClick={() => { setPag(100); handleShowPag(false) }} className='cursor-pointer flex w-full items-center hover:bg-gray-100'>
                                        <p className={pag === 100 ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>100</p>
                                        {pag === 100 && <TiTick className='ml-1 text-red-500' />}
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {loading ? <Loading loading={loading} /> : <div className='w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4'>
                {data && data.data.map(e => (
                    <Products e={e} setHasabymModal={setHasabymModal} />
                ))
                }
            </div>}
            {
                !profileShow && hasabymModal && <div>
                    <Login setHasabymModal={setHasabymModal} />
                </div>
            }
            <div className='flex justify-center py-20'>
                {data && <Paginate dataPage={data.meta.itemCount / pag} handlePageClick={handlePageClick} />}
            </div>
        </div >
    )
}

export default All