import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import axios from 'axios'
import AOS from 'aos';
import "aos/dist/aos.css";
import Products from './Products';
import Loading from '../Components/Loading/Loading';
import { useSelector } from 'react-redux';
import Login from '../Components/Login/Login';
function Category() {
    const navigate=useNavigate()
    const [filter, setFilter] = useState('Elipbiy boyunca')
    const [show, setShow] = useState(false)
    const showFilter = () => {
        setShow(!show)
    }
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
        AOS.refresh();
    }, []);
    const [showCategory, setShowCategory] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('cat'), ' ', searchParams.get('subCat'));
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [query, setQuery]=useState('')
    useEffect(() => {
        async function getData() {
            try {
                const response = 
                await axios.get
                (`/menu/by?category=${searchParams.get('subCat') ? 
                `${searchParams.get('cat')}&subCategory=${searchParams.get('subCat')}${query}`:`${searchParams.get('cat')}${query}`}`);
                setData(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
        setLoading(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [searchParams.get('cat'), searchParams.get('subCat'), query])
    const profileShow = useSelector(state => state.profileShow.profileShow)
    const [hasabymModal, setHasabymModal] = useState(false)
    return (
        <div className='flex flex-col md:w-3/4 w-full mt-5'>
            {
                !profileShow && hasabymModal && <div>
                    <Login setHasabymModal={setHasabymModal} />
                </div>
            }
            <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold' > {searchParams.get('title').toUpperCase()}</ h1>
            <div className='sm:mx-0 mx-3 my-5 flex items-center justify-between'>
                {data && <p className=''>Haryt: {data.length}</p>}
                <div className='flex'>
                    <div className='relative'>
                        <div onClick={() => showFilter()} className='hover:bg-gray-300 transition delay-200 flex items-center px-3 py-1 border text-sm cursor-pointer'>
                            <p>{filter}</p>
                            <FaAngleDown />
                        </div>
                        {show &&
                            <div className="absolute z-10 w-36 right-0 bg-white rounded divide-y divide-gray-100 shadow">
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
                                        setQuery('&popular=true');
                                        setFilter('Meshurlar'); showFilter(false)
                                    }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Meshurlar' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Meshurlar</p>
                                        {filter == 'Meshurlar' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {
                                        setQuery('');
                                        setFilter('Tazeden kona'); showFilter(false)
                                    }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Tazeden kona' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Tazeden kona</p>
                                        {filter == 'Tazeden kona' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {
                                        setQuery('&by=price&order=ASC')
                                        setFilter('Arzandan gymmada'); showFilter(false)
                                    }} className='cursor-pointer flex items-center hover:bg-gray-100'>
                                        <p className={filter == 'Arzandan gymmada' ? "text-red-500 block py-1 pl-4 text-md" : "text-md block py-1 pl-4"}>Arzandan gymmada</p>
                                        {filter == 'Arzandan gymmada' && <TiTick className='text-red-500' />}
                                    </li>
                                    <li onClick={() => {
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
                    {/* <AiTwotoneFilter onClick={() => setShowCategory(!showCategory)} className='cursor-pointer md:hidden block text-white ml-1 text-3xl p-1.5 border bg-red-600 hover:bg-black transition duration-500 easy-in-out' /> */}
                </div>
            </div>
            {/* {showCategory &&
                <div className='mt-1 mb-3 px-2'>
                    {category1.map((data) => (
                        <Accordion key={data} data={data} />
                    ))}
                    <div className='text-white hover:bg-black transition duration-500 easy-in-out flex items-center justify-center rounded-3xl mt-2 bg-gray-400 w-full text-center py-1 cursor-pointer'>
                        <BsEraserFill className='mr-0.5 text-white' />
                        <p>Arassala</p>
                    </div>
                </div>
            } */}
            <div>
                {
                    loading ? <Loading loading={loading} /> :
                        <div className='w-full grid grid-cols-2 grid-gap-2 sm:grid-cols-3 sm:grid-gap-3 md:grid-cols-2 md:grid-gap-2 lg:grid-cols-3 lg:grid-gap-3 xl:grid-cols-4 xl:grid-gap-4'>
                            {data && data.map(e => (
                                <Products e={e} setHasabymModal={setHasabymModal}/>
                            ))
                            }
                        </div>
                }
            </div>
        </div >
    )
}

export default Category
