import React, { useEffect, useState } from 'react'
import { AiOutlineZoomIn } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { BiPlay } from 'react-icons/bi'
import AOS from 'aos';
import "aos/dist/aos.css";
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../Features/cartSlice'
import { Link } from 'react-router-dom'
import { addEqual, delItemToEqual } from '../Features/equalSlice'
import { LightgalleryProvider, LightgalleryItem, useLightgallery } from "react-lightgallery";
import Login from '../Components/Login/Login'
import service from '../Components/Interceptors/axios';
function Products({ e , setHasabymModal}) {
    const [show, setShow] = useState(true)
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: "true"
        });
    }, []);
    const cartProducts = useSelector(state => state.cart.cartProducts)
    const dispatch = useDispatch()
    const addCartOne = (product) => {
        setTimeout(() => {
            setShow(false)
        }, 1500)
        const existItem = cartProducts.find(x => x.product.id === product.id)
        if (existItem) {
            dispatch(addCart({ quantity: existItem.quantity, product }))
        } else {
            dispatch(addCart({ quantity: 1, product }))
        }
    }
    const [favProducts, setFavProducts] = useState()
    const [check, setCheck] = useState(false)
    const [like, setLike] = useState(false)
    useEffect(() => {
        async function getData() {
            try {
                const response = await service.get('/users/favorites')
                setFavProducts(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [like])

    useEffect(() => {
        const existItem = favProducts && favProducts.find(x => x.id === e.id)
        setCheck(existItem)
    }, [favProducts])
    const handleHeart = () => {
        setHasabymModal(true)
        if (!check) {
            service.post(`/product/like/${e.id}`, {})
                .then(res => {
                    console.log(res.data);
                    setLike(!like)
                }).catch(err => {
                    console.log(err);
                }
                )
        } else {
            service.delete(`/product/like/${e.id}`)
                .then(res => {
                    console.log(res.data);
                    setLike(!like)
                }).catch(err => {
                    console.log(err);
                }
                )
        }
    }

    const [checkCart, setCheckCart] = useState(false)
    useEffect(() => {
        const existItem = cartProducts.find(x => x.product.id === e.id)
        setCheckCart(existItem)
    }, [cartProducts])

    const equalProducts = useSelector(state => state.equal.equalProducts)
    const [equal, setEqual] = useState(false)
    useEffect(() => {
        const existItem = equalProducts.find(x => x.e.id === e.id)
        setEqual(existItem)
    }, [equalProducts])

    const handleEqual = () => {
        if (!equal && equalProducts.length < 4) {
            dispatch(addEqual({ e }))
        } else {
            dispatch(delItemToEqual({ e }))
        }
        if (equalProducts.length === 4) {
            setEqual(false)
        }
    }
    const [open, setOpen] = useState(false);
    const PhotoItem = ({ image, thumb, group }) => (
        <div style={{ maxWidth: "250px", width: "200px", padding: "5px" }}>
            <LightgalleryItem group={group} src={image} thumb={thumb}>
                <img alt={image} src={image} style={{ width: "100%" }} />
            </LightgalleryItem>
        </div>
    );
    const OpenButtonWithHook = props => {
        const { openGallery } = useLightgallery();
        return (
            <button {...props} onClick={() => openGallery("group2")}>
                <AiOutlineZoomIn className='text-xl mx-1' />
            </button>
        );
    };
    return (
        <div data-aos='fade' className='m-0 border-2 p-1'>
            <div className='flex items-center justify-end'>
                <div className='flex items-center md:border-2 rounded-md px-1 cursor-pointer'>
                    <input className='md:mr-1 cursor-pointer' id={e.title} name={e.title} onChange={() => handleEqual()} checked={equal} type={'checkbox'} />
                    <label htmlFor={e.title} className='md:block hidden cursor-pointer'>Denesdirmek</label>
                </div>
                <LightgalleryProvider>
                    <div className="hidden">
                        {e.imageUrl.map((p, idx) => (
                            <PhotoItem key={idx} image={p} group="group2" />
                        ))}
                    </div>
                    <OpenButtonWithHook />
                </LightgalleryProvider>
                {!check ?
                    <AiOutlineHeart onClick={() => handleHeart()} className='cursor-pointer text-xl text-red-500' /> :
                    <AiFillHeart onClick={() => handleHeart()} className='cursor-pointer text-xl text-red-500' />
                }
            </div>
            <div className='absolute overflow-hidden text-center w-16 h-16' style={{ top: '-1px', left: '-1px' }}>
                <span className='text-sm text-white bg-red-500 absolute block text-center transform -rotate-45' style={{ width: '10rem', left: '-3.5rem', top: '1rem' }}>
                    Taze
                </span>
            </div>
            <div onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
                <Link to={`/product/${e.id}`} onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                }}>
                    {e.imageUrl && <img alt={e.imageUrl[0]} src={!open ? `${e.imageUrl[0]}` : `${e.imageUrl[1] ? e.imageUrl[1] : e.imageUrl[0]}`} />}
                </Link>
            </div>
            <div className='flex flex-col items-center'>
                <Link to={`/product/${e.id}`} onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                }}><h6 className='hover:text-red-500 text-center px-1 h-24 text-sm leading-5'>{e.title}</h6></Link>
                <p className='w-12 h-0.5 bg-red-500'></p>
                <div className='flex justify-center my-1 items-center'>
                    <p className='font-bold mr-1'>{e.price}.00</p>
                    <span className=''>TMT</span>
                </div>
                {!checkCart ?
                    <button onClick={() => addCartOne(e)} className='mb-2 bg-red-600 text-xs px-4 py-2 text-white rounded-2xl transition duration-500 hover:bg-black'>
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
    )
}

export default Products