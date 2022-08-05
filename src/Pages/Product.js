import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { LightgalleryItem } from "react-lightgallery";
import { LightgalleryProvider } from "react-lightgallery";
import _ from "lodash";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoIosCopy } from 'react-icons/io'
import { IoLogoGoogle } from 'react-icons/io'
import copy from "copy-to-clipboard";
import SampleRating from '../Components/SampleRating';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillCaretRight } from 'react-icons/ai'
import { Tooltip } from '../Components/Tooltip/Tooltip';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../Features/cartSlice';
import { BiPlay } from 'react-icons/bi';
import service from '../Components/Interceptors/axios';
import Login from '../Components/Login/Login';
import BahaModal from '../Components/BahaBermek/BahaModal';
import Menzeshler from './product/Menzeshler';
import NewTab from './main-page/NewTab'
import PopularTab from './main-page/PopularTab'
function Product() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams()
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };
    const schema = yup.object().shape({
        teswir: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [rating, setRating] = useState('')
    const [data, setData] = useState(null)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/product/item/${id}`);
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [id])
    const copyToClipboard = (data) => {
        copy(data);
        alert(`You have copied "${data}"`);
    }
    const cartProducts = useSelector(state => state.cart.cartProducts)
    const dispatch = useDispatch()
    const [show, setShow] = useState(true)
    const addCartOne = (product) => {
        setTimeout(() => {
            setShow(false)
        }, 1500)
        const existItem = cartProducts.find(x => x.product.id === product.id)
        if (existItem) {
            dispatch(addCart({ quantity: existItem.quantity, product: product.data }))
        } else {
            dispatch(addCart({ quantity: 1, product: product.data }))
        }
    }
    const [checkCart, setCheckCart] = useState(false)
    useEffect(() => {
        const existItem = cartProducts.find(x => data && x.product.id === data.id)
        setCheckCart(existItem)
    }, [cartProducts])


    const [favProducts, setFavProducts] = useState(null)
    const [like, setLike] = useState(false)
    const [hasabymModal, setHasabymModal] = useState(false)
    useEffect(() => {
        async function getData() {
            try {
                const response = await service.get('/users/favorites');
                setFavProducts(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [like, hasabymModal])
    const [check, setCheck] = useState(false)
    useEffect(() => {
        const existItem = favProducts && favProducts.find(x => data && x.id == data.id)
        setCheck(existItem)
    }, [favProducts])

    const handleHeart = (id) => {
        console.log(id);
        setHasabymModal(true)
        if (!check) {
            service.post(`/product/like/${id}`, {})
                .then(res => {
                    console.log(res.data);
                    setLike(!like)
                }).catch(err => {
                    console.log(err);
                }
                )
        } else {
            service.delete(`/product/like/${id}`)
                .then(res => {
                    console.log(res.data);
                    setLike(!like)
                }).catch(err => {
                    console.log(err);
                }
                )
        }
    }
    const profileShow = useSelector(state => state.profileShow.profileShow)
    const handleTeswir = (d) => {
        async function getData() {
            try {
                const res = await service.post('/product/review', { "text": d.teswir, "product": data.id, "stars": rating });
                if (res.status === 201) {
                    alert('ugradyldy')
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }
    const [menu, setMenu] = useState(0)
    const [showBaha, setShowBaha] = useState(false)
    return (
        <div className='w-full md:w-3/4 mt-5'>
            <div className='flex md:flex-row flex-col'>
                {
                    !profileShow && hasabymModal && <div className='fixed' style={{ height: '100vh', width: '100vw' }}>
                        <Login setHasabymModal={setHasabymModal} />
                    </div>
                }
                {
                    !profileShow && showBaha && <BahaModal setShowBaha={setShowBaha} />
                }
                <div className='md:w-2/5 px-3 md:px-0 w-full'>
                    <div className='p-2 border w-full border-box'>
                        <Slider {...settings} style={!profileShow && hasabymModal ? { zIndex: '-9999' } :{zIndex:'1'}}>
                            {
                                data && data.imageUrl.map(e => (
                                    <img src={e} className='w-full h-68 md:h-80 cursor-pointer' />
                                ))
                            }

                        </Slider>
                    </div>
                    <ul className='flex mt-2'>
                        <LightgalleryProvider>
                            {data && data.imageUrl.map(i => (
                                <LightgalleryItem src={i}>
                                    <li key={i} className='p-1 bg-white border px-1 mr-0.5'>
                                        <img src={i} className='h-12' />
                                    </li>
                                </LightgalleryItem>
                            ))}
                        </LightgalleryProvider>
                    </ul>
                </div>
                <div className='px-3 md:px-0 md:ml-5 md:w-3/5 w-full '>
                    {data && <p className='my-2 text-lg'>{data.title}</p>}
                    <div className='flex w-full flex-wrap items-center'>
                        <img src={data && data.companyImage} className='h-20 w-20 md:mr-2' />
                        <div className='h-8 flex items-center md:border-2 rounded-md px-1 cursor-pointer'>
                            <input className='md:mr-2 cursor-pointer' name='denesdirmek' type={'checkbox'} />
                            <label htmlFor='denesdirmek' className='cursor-pointer'>Denesdirmek</label>
                        </div>
                        <div className='mx-2 h-8 flex items-center md:border-2 rounded-md px-1 cursor-pointer'>
                            {!check ?
                                <AiOutlineHeart onClick={() => handleHeart(data.id)} className='cursor-pointer text-xl text-red-500' /> :
                                <AiFillHeart onClick={() => handleHeart(data.id)} className='cursor-pointer text-xl text-red-500' />
                            }
                            <p className='cursor-pointer'>Halaýanlaryma goş</p>
                        </div>
                    </div>
                    <div className='py-2'>
                        <p className='my-2 font-bold'>Bölek belgisi / Modeli</p>
                        <div className='flex'>
                            {data && <p className='cursor-pointer text-sm py-1 px-3 hover:border-red-600 border border-gray-600'>{data.model}</p>}
                            <Tooltip message={'Göçüriň'}>
                                <IoIosCopy onClick={() => copyToClipboard(data.model)} className='transition duration-500 ease-in-out text-3xl p-1 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer border border-blue-500' />
                            </Tooltip>
                            <Tooltip message={'Google-da gözläň'}>
                                <IoLogoGoogle className='transition duration-500 ease-in-out text-3xl p-1 cursor-pointer text-red-600 hover:text-white hover:bg-red-600 border border-red-600' />
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <p className='my-2 font-bold'>Gysga düşündirişi</p>
                        {data && <p className='text-gray-600'>{data.mainDescription}</p>}
                    </div>
                    <div className='my-4 flex aitems-center'>
                        {data && <p className='font-bold text-lg mr-5'>{data.price}<span className='font-medium text-sm'>{' '}TMT</span></p>}
                        {!checkCart ?
                            <button onClick={() => addCartOne({ data })} className='mb-2 bg-red-600 text-xs px-4 py-2 text-white rounded-2xl transition duration-500 hover:bg-black'>
                                SEBEDE GOS
                            </button> :
                            <div>
                                {
                                    <Link className='mb-2 flex items-center font-medium text-xs px-4 py-1.5 hover:border-red-500 border-2 text-red-500 rounded-2xl transition duration-500 hover:bg-red-500 hover:text-white' to='/card' ><BiPlay />SEBEDE GIT</Link>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='w-full my-7'>
                <ul className='flex justify-center flex-wrap'>
                    <li onClick={() => setMenu(0)} className={menu === 0 ? 'border-b-2 border-red-600 mx-4 font-bold text-lg text-red-600' : 'cursor-pointer mx-4 font-bold text-lg'}>ÄHLI AÝRATYNLYKLAR</li>
                    <li onClick={() => setMenu(1)} className={menu === 1 ? 'border-b-2 border-red-600 mx-4 font-bold text-lg text-red-600' : 'cursor-pointer mx-4 font-bold text-lg'}>DÜŞÜNDIRIŞ</li>
                    <li onClick={() => { setMenu(2); setShowBaha(true) }} className={menu === 2 ? 'border-b-2 border-red-600 mx-4 font-bold text-lg text-red-600' : 'cursor-pointer mx-4 font-bold text-lg'}>TESWIRLER</li>
                </ul>
                {
                    menu === 0 && data &&
                    <div className="w-full px-3 md:px-0 text-sm mt-8 text-gray-500">
                        {data.allSpecifications ?
                            Object.keys(data.allSpecifications.specification).map((e, k) => (
                                <div className='flex flex-col'>
                                    <div className={k % 2 == 1 ? 'border flex bg-white' : 'border flex bg-gray-200'}>
                                        <div className='w-1/2 px-3 border-r border-gray-300 flex h-auto py-2 items-center '>
                                            {e}
                                        </div>
                                        <div className='w-1/2 px-3 flex h-auto items-center py-2'>
                                            {data.allSpecifications.specification[e]}
                                        </div>
                                    </div>
                                </div>
                            )):<p>''</p>
                        }
                    </div>
                }
                {
                    menu === 1 &&
                    <div className='px-2 py-6 pb-10 border bg-white mt-8'>
                        {data.description ? <p>{data.description.desc}</p> : <p></p>}
                    </div>
                }
                {profileShow && menu === 2 &&
                    <div className='mt-8 bg-white border flex flex-col justify-center items-center'>
                        <div className='my-4'><SampleRating rating={rating} setRating={setRating} /></div>
                        <form className='lg:w-1/2 md:w-2/3 w-full px-4' onSubmit={handleSubmit(data => handleTeswir(data))}>
                            <Controller
                                control={control}
                                name='teswir'
                                render={({ field: { onChange, onBlur } }) => {
                                    return (
                                        <div className='my-2'>
                                            <textarea placeholder='Teswir' onChange={onChange} onBlur={onBlur} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none" id="text" rows="5" />
                                            <p className='text-red-500'>{errors.teswir?.message}</p>
                                        </div>
                                    )
                                }}
                            />
                            <button type='submit' className='w-full cursor-pointer my-4 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                                <AiFillCaretRight />
                                <p>Ugrat</p>
                            </button>
                        </form>
                    </div>
                }
            </div>
            <Menzeshler id={id && id} cat={data && data.category.id} subCat={data && data.subCategory!=null && data.subCategory.id} title={data && data.category.title} />
            <Link to='/all'><p className='mb-2 mt-2 md:mt-10 text-center text-2xl font-bold'>TÄZELER</p></Link>
            <NewTab />
            <Link to='/all?popular=true'><p className='mb-2 mt-2 md:mt-10 text-center text-2xl font-bold'>MEŞHURLAR</p></Link>
            <PopularTab />
        </div >
    )
}

export default Product
