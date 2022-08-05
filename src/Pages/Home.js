import React, { useEffect, useState } from 'react'
import SliderMain from '../Components/SliderMain'
import SliderMain1 from '../Components/SliderMain1'
import { RiArrowDropRightFill } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'
import { IoPersonCircleSharp } from "react-icons/io5";
import { data } from '../Components/data'
import AOS from 'aos';
import "aos/dist/aos.css";
import Monitor from '../Components/Monitor'
import Notebooks from '../Components/Notebooks'
import Products from './Products'
import { Link } from 'react-router-dom'
import RecommendTab from './main-page/RecommendTab'
import NewTab from './main-page/NewTab'
import PopularTab from './main-page/PopularTab'
import Router from './Main-Category/Router'
import Plata from './Main-Category/Plata'
import WideoKarta from './Main-Category/WideoKarta'
import MobilPeriferiya from './Main-Category/MobilPeriferiya'
import Gulaklyklar from './Main-Category/Gulaklyklar'
import Kalonkalar from './Main-Category/Kalonka'
import axios from 'axios'
import Teswir from '../Components/Teswir'
function Home() {
    const [menu, setMenu] = useState(0)
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
        AOS.refresh();
    }, []);
    return (
        <div className='md:w-3/4 w-full md:mt-5 mt-0'>
            <SliderMain />
            <SliderMain1 />
            <div className='w-full my-3'>
                <ul className='flex justify-center flex-wrap'>
                    <li onClick={() => setMenu(0)} className={menu === 0 ? 'border-b-2 border-red-600 mx-4 font-bold text-lg text-red-600' : 'cursor-pointer mx-4 font-bold text-lg'}>MASLAHAT BERILYANLER</li>
                    <li onClick={() => setMenu(1)} className={menu === 1 ? 'border-b-2 border-red-600 mx-4 font-bold text-lg text-red-600' : 'cursor-pointer mx-4 font-bold text-lg'}>TAZELER</li>
                    <li onClick={() => setMenu(2)} className={menu === 2 ? 'border-b-2 border-red-600 mx-4 font-bold text-lg text-red-600' : 'cursor-pointer mx-4 font-bold text-lg'}>MESHURLAR</li>
                </ul>
            </div>
            {menu===0 && <RecommendTab />}
            {menu===1 && <NewTab />}
            {menu===2 && <PopularTab />}
            <div className='pb-4'>
                <Router />
            </div>
            <div className='pb-4'>
                <Plata />
            </div>
            <div className='pb-4'>
                <WideoKarta />
            </div>
            <div className='pb-4'>
                <MobilPeriferiya />
            </div>
            <div className='pb-4'>
                <Gulaklyklar />
            </div>
            <div className='pb-4'>
                <Kalonkalar />
            </div>
            <div className='md:hidden block'>
                <Teswir />
            </div>
        </div>
    )
}

export default Home
