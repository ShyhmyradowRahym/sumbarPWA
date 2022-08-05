import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
// import { data } from '../Components/allData'
import AOS from 'aos';
import "aos/dist/aos.css";
import Products from './Products'
import axios from 'axios'
import Paginate from '../Components/Paginate/Paginate';
import { useSearchParams } from 'react-router-dom';
function Brands() {
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
        setPageCount(data.selected+1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('title'));
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/main-page/by-brand?page=${pageCount}&take=${pag}&company=${searchParams.get('title')}`);
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [pageCount,pag,searchParams.get('title')])

    console.log(pageCount);
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
                                    <li onClick={() => { setFilter('Elipbiy boyunca'); showFilter(false) }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter === 'Elipbiy boyunca' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Elipbiy boyunca</p>
                                        {filter === 'Elipbiy boyunca' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => { setFilter('Basda arzanladyslar'); showFilter(false) }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter === 'Basda arzanladyslar' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Basda arzanladyslar</p>
                                        {filter === 'Basda arzanladyslar' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => { setFilter('Meshurlar'); showFilter(false) }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter === 'Meshurlar' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Meshurlar</p>
                                        {filter === 'Meshurlar' && <TiTick className='text-red-500' />}
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
            <div className='w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4'>
                {data && data.data.map(e => (
                    <Products e={e} />
                ))
                }
            </div>
            <div className='flex justify-center py-20'>
                {data && <Paginate dataPage={data.meta.itemCount / pag} handlePageClick={handlePageClick} />}
                {/* <Paginate dataPage={1342 / 40} /> */}
            </div>
        </div >
    )
}

export default Brands