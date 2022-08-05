import React, { useState } from 'react'
import FooterSlider from './FooterSlider'
import { SiGooglemaps } from 'react-icons/si'
import { MdOutlineLocalPostOffice } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import NagilelikModal from './NagilelikModal'
function Footer() {
    const [nagilelikModal, setNagilelikModal] = useState(false)
    return (
        <div className='px-2 md:px-0 w-full text-white' style={{ background: '#212121' }}>
            <div className='md:block hidden'>
                <FooterSlider />
            </div>
            <p className='w-full border-t border-white'></p>
            <div className='flex md:flex-row flex-col md:mx-5 mx-1 text-gray-400 mx-auto my-4'>
                <div className='w-full md:w-3/5 flex flex-col font-bold'>
                    <img src='https://sumbar-computer.com/img/sumbar-computer-light.svg' className='w-56' />
                    <div className='mt-4 md:w-3/4 flex my-1'>
                        <a className='flex' target="_blank" href='https://www.google.com/maps/place/Sumbar+Computer/@37.9188776,58.4038013,17z/data=!3m1!4b1!4m5!3m4!1s0x3f6ffd04db8699e3:0x19a518b3680de4d3!8m2!3d37.9188776!4d58.4038013?hl=en'>
                            <SiGooglemaps className='text-xl mt-0.5' />
                            <p className='ml-1 ms:text-md text-sm'>Türkmenistan, Aşgabat, köç. A.Niýazow (Hudayberdýew), 99</p>
                        </a>
                    </div>
                    <div className='flex items-center my-2'>
                        <MdOutlineLocalPostOffice className='cursor-pointer text-lg mt-0.5' />
                        <p className='ml-1 cursor-pointer text-sm md:text-md'>sumbar.computer@gmail.com</p>
                    </div>
                    <div className='flex items-center my-2'>
                        <BsFillTelephoneFill className='cursor-pointer text-sm mt-0.5' />
                        <a href='tel:+99312492343' className='ml-1 text-sm md:text-md cursor-pointer'>+993 (12) 49-23-43</a>
                    </div>
                    <div className='flex items-center'>
                        <AiOutlineWhatsApp className='cursor-pointer text-xl' />
                        <AiOutlineInstagram className='text-xl cursor-pointer mx-1' />
                        <img src='https://sumbar-computer.com/img/social/imo.svg' className='h-5' />
                    </div>
                </div>
                <div className='md:mt-0 mt-5 w-full flex flex-col'>
                    <p className='text-md text-gray-300 font-bold'>Sumbar Computer - Türkmenistanda kompýuter we periferiýa enjamlary dükany</p>
                    <div className='flex'>
                        <div className='w-1/2 mr-2'>
                            <ul className='text-sm my-4'>
                                <li onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }}><Link to='/about'>Biz barada</Link></li>
                                <li onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }} className='my-2'><Link to='/guarantee'>Kepillik</Link></li>
                                <li onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }}><Link to='/privacy-policy'>Gizlinlik syýasaty</Link></li>
                            </ul>
                        </div>
                        <div className='w-1/2'>
                            <ul className='text-sm my-4'>
                                <li onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }}><Link to='/service'>Tehniki hyzmat</Link></li>
                                <li onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }} className='my-2'><Link to='/delivery-and-payment'>Eltip bermek we töleg</Link></li>
                                <li onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }}><Link to='/brands'>Brendler</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col'>
                        <div className='md:w-1/2 w-full'>
                            <label htmlFor='abuna' className='text-gray-300'>Täzeliklere abuna boluň</label>
                            <input type="text" id="abuna" className="mt-1.5 focus:ring-blue-500 focus:border-blue-500 outline-transparent py-2 p-1 pl-2 md:w-3/4 w-full text-sm text-gray-900 bg-white rounded border" placeholder="E-poctanyz" />
                        </div>
                        <div className='md:w-1/2 w-full md:mt-0 mt-4'>
                            <p className='text-gray-300'>Websaýty gowulaşdyrmaga kömek ediň</p>
                            <p onClick={() => setNagilelikModal(true)} className='md:w-3/4 w-full mt-1.5 py-1.5 p-1 border text-center cursor-pointer border-red-600 text-red-600 transition duration-500 ease-in-out hover:bg-red-600 hover:text-white rounded'>Nagilelik bildirmek</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-gray-400 md:h-32 h-28 md:mx-5 mx-1 flex items-center'>
                <p>© 2022 sumbar-computer.com Ähli hukuklary goraglydyr.</p>
            </div>
            {nagilelikModal &&
                <NagilelikModal nagilelikModal={nagilelikModal} setNagilelikModal={setNagilelikModal} />
            }
        </div>
    )
}

export default Footer