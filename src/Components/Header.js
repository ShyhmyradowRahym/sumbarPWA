import React, { useEffect, useRef, useState } from 'react'
import { RiPhoneLine } from "react-icons/ri";
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { VscGlobe } from "react-icons/vsc";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { RiCheckLine } from 'react-icons/ri'
import { RiSearchLine } from "react-icons/ri";
import { TbMenu } from "react-icons/tb";
import Logo from '../img/logo.svg'
import { useSelector, useDispatch } from 'react-redux';
import { TiTimes } from "react-icons/ti";
import { BiSearch } from 'react-icons/bi'
import Equal from './Equal';
import { data } from './allData.js'
import _ from "lodash";
import AOS from 'aos';
import "aos/dist/aos.css";
import NagilelikModal from './NagilelikModal';
import AccordionHeader from './AccordionHeader';
import Login from './Login/Login';
import axios from 'axios'
import Sign from './SignIn/Sign';
import { handleProfileShow } from '../Features/profileSlice';
function Header() {
    const [hasabymShow, SetHasabymShow] = useState(false)
    const [showLang, setShowLang] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [sortLang, setSortLang] = useState('Turkmen')
    const ShowLang = () => {
        setShowLang(!showLang)
    }
    const ShowSearch = () => {
        setShowSearch(!showSearch)
    }
    const [header, setHeader] = useState("header");

    const listenScrollEvent = () => {
        if (window.scrollY < 13) {
            return setHeader("header");
        } else if (window.scrollY > 13) {
            return setHeader("header2");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);

        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);
    const [showMenu, setShowMenu] = useState(false)
    const cartProducts = useSelector(state => state.cart.cartProducts)
    const equalProducts = useSelector(state => state.equal.equalProducts)
    const show = useSelector(state => state.equal.show)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const [dataSearch, setDataSearch] = useState('')
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/product/search?word=${search}`);
                setDataSearch(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [search])
    const handleSearch = () => {
        navigate({
            pathname: "search",
            search: `?${createSearchParams({
                q: `${search.toLocaleLowerCase()}`
            })}`
        });
        setSearch('')
    }
    const onEnter = (event) => {
        event.key === 'Enter' && navigate({
            pathname: "search",
            search: `?${createSearchParams({
                q: `${search.toLocaleLowerCase()}`
            })}`
        }
        );
        event.key === 'Enter' && setSearch('')
    }
    const handleSearchMini = (e) => {
        navigate({
            pathname: `product/${e}`,
            // search: `?${createSearchParams({
            //     q: `${search.toLocaleLowerCase()}`
            // })}`
        });
        setSearch('')
    }
    const [hasabymModal, setHasabymModal] = useState(false)
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
        AOS.refresh();
    }, []);
    const [nagilelikModal, setNagilelikModal] = useState(false)
    const nodeRef = useRef()
    const toggleMenu = () => {
        setShowMenu(!showMenu)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    useEffect(() => {
        const handleOutsideClick = e => {
            if (!nodeRef.current.contains(e.target)) {
                toggleMenu()
            }
        }
        if (showMenu) {
            document.addEventListener("mousedown", handleOutsideClick)
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [showMenu])
    const dispatch = useDispatch()
    const [profilListShow, setProfilListShow] = useState(false)
    const profileShow = useSelector(state => state.profileShow.profileShow)
    const [logged, setLogged] = useState(profileShow)
    const [category, setCategory] = useState(null)
    const [SignShow, SetSignShow] = useState(false)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/menu`);
                setCategory(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])
    const handleLogOut=()=>{
        window.location.reload(); setProfilListShow(false); dispatch(handleProfileShow(false)); setLogged(false); localStorage.clear()
    }
    return (
        <div className='bg-black text-gray-400'>
            <nav className={`md:mx-5 mx-0 h-10 flex justify-between items-center`}>
                <div className='flex items-center md:text-xs lg:text-md w-40'>
                    <RiPhoneLine />
                    <a href='tel:+99364222017' className='text-xs'>+993 (64) 22-20-17</a>
                </div>
                <div className='md:block flex-wrap hidden text-center text-sm'>
                    <Link to='/about'>Biz barada</Link>
                    <Link to='/service' className='lg:mx-4 md:mx-2'>Tehniki hyzmat</Link>
                    <Link to='/guarantee'>Kepillik</Link>
                    <Link to='/delivery-and-payment' className='lg:mx-4 md:mx-2'>Eltip bermek we töleg</Link>
                    <Link to='/ratings'>teswirler</Link>
                    <button onClick={() => setNagilelikModal(true)} className='md:ml-4 ml-2'>Nagilelik bildirmek</button>
                </div>
                {nagilelikModal &&
                    <NagilelikModal nagilelikModal={nagilelikModal} setNagilelikModal={setNagilelikModal} />
                }
                <div className='flex items-center md:mx-0 mx-2'>
                    <VscGlobe />
                    <ul>
                        <li className='relative'>
                            <div onClick={() => ShowLang()} className='text-xs cursor-pointer'>
                                {sortLang}
                            </div>
                            {showLang &&
                                <div className="absolute mt-1 z-10 w-24 right-0 bg-white rounded divide-y divide-gray-100 shadow ">
                                    <ul className="py-1 text-xs text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <p onClick={() => { setSortLang('Turkmen'); setShowLang(false) }} className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Turkmen</p>
                                        </li>
                                        <li>
                                            <p onClick={() => { setSortLang('English'); setShowLang(false) }} className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">English</p>
                                        </li>
                                        <li>
                                            <p onClick={() => { setSortLang('Russian'); setShowLang(false) }} className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Russian</p>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
            <div className={`w-full md:px-0 bg-black ${header}`}>
                <header className='pb-1 md:px-0 h-12 md:h-16 bg-black md:mx-5 mx-0 justify-between flex items-center'>
                    <Link to='/'><img src={Logo} className='md:w-60 w-36' /></Link>
                    <div className='relative md:w-96 lg:w-1/3 flex flex-col lg:mr-24 md:block hidden'>
                        <div className="flex items-center">
                            <input onKeyPress={e => onEnter(e)} value={search} onChange={(e) => setSearch(e.target.value)} type="search" className="ring-red-500 outline-transparent block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-l-lg border" placeholder="Gozleg" />
                            <p onClick={() => handleSearch()} className='cursor-pointer bg-red-600 transition duration-500 ease-in-out hover:bg-black p-2 text-white text-2xl rounded-r-lg'><BiSearch /></p>
                        </div>
                        {search && <div className='absolute z-20 w-full rounded bg-white'>
                            <ol>
                                {dataSearch && dataSearch.map((i,k) => (
                                    <li key={k} onClick={() => handleSearchMini(i.id)} className='hover:bg-gray-50 cursor-pointer h-20 border-b flex items-center px-2'>
                                        <img src={i.imageUrl[0]} className='h-12 mr-3' />
                                        <p className='text-md text-gray-700'>{i.title}</p>
                                    </li>
                                ))}
                                {dataSearch && dataSearch.length===0 && <p className='py-3 px-3 border text-black bg-white'>Haryt tapylmady</p>}
                            </ol>
                            {dataSearch && dataSearch.length>0 && <p className='rounded-b cursor-pointer py-1 bg-gray-300 text-gray-600 text-center'>Hemme netijeler</p>}
                        </div>}
                    </div>
                    <div className='flex items-center'>
                        <div onClick={() => ShowSearch()} className='md:hidden block mr-1 text-2xl md:text-3xl text-white cursor-pointer'>
                            <RiSearchLine />
                        </div>
                        <div className="relative cursor-pointer md:p-0">
                            {!profileShow ? <div onClick={() => SetHasabymShow(!hasabymShow)} className='relative'>
                                <IoPersonCircleSharp className='md:p-0 md:w-auto text-2xl md:text-3xl text-white' />
                                <RiCloseFill className="absolute top-0 left-3 md:left-4 bg-red-500 rounded-full text-white text-sm" />
                            </div> :
                                <div onClick={() => setProfilListShow(!profilListShow)} className='relative flex items-center'>
                                    <IoPersonCircleSharp className='md:p-0 md:w-auto text-2xl md:text-3xl text-white' />
                                    <RiCheckLine className="absolute top-0 left-3 md:left-4 bg-green-500 rounded-full text-white text-sm" />
                                </div>}
                            {hasabymShow && <p onClick={() => { setHasabymModal(true); SetHasabymShow(!hasabymShow) }} className='absolute mt-0.5 text-black rounded divide-y divide-gray-100 w-36 py-2 text-sm px-1 text-center bg-white z-20 right-0'>Hasabyma gir</p>}
                            {profilListShow && <ul>
                                <div className="absolute mt-1 z-10 w-48 right-0 bg-white rounded divide-y divide-gray-100 shadow ">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li onClick={() => setProfilListShow(false)}>
                                            <Link to='/orders-history' className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sargytlaryň taryhy</Link>
                                        </li>
                                        <li onClick={() => setProfilListShow(false)}>
                                            <Link to='/favorites' className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Halaýanlarym</Link>
                                        </li>
                                        <li onClick={() => setProfilListShow(false)}>
                                            <Link to='/my-reviews' className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Teswirlerim</Link>
                                        </li>
                                        <li onClick={() => setProfilListShow(false)}>
                                            <Link to='/my-addresses' className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Salgylarym</Link>
                                        </li>
                                        <li onClick={() => setProfilListShow(false)}>
                                            <Link to='/profile-edit' className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profilimi üýtgetmek</Link>
                                        </li>
                                        <li onClick={() => handleLogOut()}>
                                            <p className="cursor-pointer block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hasabymdan çyk</p>
                                        </li>
                                    </ul>
                                </div>
                            </ul>}
                        </div>
                        <div className="relative cursor-pointer md:p-0 ml-2">
                            <Link to='/card' >
                                <RiShoppingBasket2Line className='md:p-0 md:w-auto text-2xl md:text-3xl text-white' />
                                <p className="absolute top-0 left-3 md:left-4 bg-red-500 rounded-full text-white text-xs px-1 md:px-1.5" >{cartProducts.length}</p>
                            </Link>
                        </div>
                        {!showMenu ?
                            <TbMenu onClick={() => toggleMenu()} className='md:mx-0 mx-2 cursor-pointer md:hidden block text-2xl md:text-3xl text-white mx-1' /> :
                            <TiTimes onClick={() => toggleMenu()} className='md:mx-0 mx-2 cursor-pointer md:hidden block text-2xl md:text-3xl text-white mx-1' />}
                    </div>
                </header>
                {showSearch &&
                    <div className='w-full py-1 px-2'>
                        <div className="flex items-center">
                            <input onKeyPress={e => onEnter(e)} value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="ring-red-500 outline-transparent block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-l-lg border" placeholder="Gozleg" />
                            <p onClick={() => handleSearch()} className='bg-red-600 transition duration-500 ease-in-out hover:bg-black p-2 text-white text-2xl rounded-r-lg'><BiSearch /></p>
                        </div>
                        {search && <div className='w-full z-20 rounded bg-white'>
                            <ol className='px-2'>
                                {_.times(7, (i) => (
                                    <li onClick={() => handleSearchMini(data[i].link)} key={i} className='cursor-pointer h-16 border-b flex items-center'>
                                        <img src={data[i].img} className='h-12 mr-3' />
                                        <p>{data[i].title}</p>
                                    </li>
                                ))}
                            </ol>
                            <p onClick={() => handleSearch()} className='rounded-b cursor-pointer py-1 bg-gray-300 text-gray-600 text-center'>Hemme netijeler</p>
                        </div>}
                    </div>
                }
            </div>
            {showMenu && <div ref={nodeRef} className='md:hidden block'>
                {category && category.map((data) => (
                    <AccordionHeader setShowMenu={setShowMenu} key={data} data={data} />
                ))}
            </div>}
            {equalProducts.length > 0 && show && <Equal />}
            {hasabymModal && <div
                className='absolute'>
                <Login setHasabymModal={setHasabymModal} SetSignShow={SetSignShow} />
            </div>}
            {SignShow && <div
                className='absolute'>
                <Sign SetSignShow={SetSignShow} />
            </div>}
        </div>
    )
}

export default Header