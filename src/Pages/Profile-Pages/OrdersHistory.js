import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import service from '../../Components/Interceptors/axios';

const OrdersHistory = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        async function getData() {
            try {
                const res = await service.get('/product/history');
                setData(res.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])
    const profileShow = useSelector(state => state.profileShow.profileShow)
    useEffect(()=>{
        !profileShow && window.location.replace('/')
    },[])
    return (
        <div className='md:w-3/4 px-3 md:px-0 md:mt-5 mt-0 w-full flex flex-col'>
            <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>SARGYTLARYŇ TARYHY</h1>
            <div className='flex h-16 border bg-white'>
                <div className='w-2/12 h-full flex items-center justify-center'>№</div>
                <div className='w-1/5 h-full flex items-center justify-center'>Wagty</div>
                <div className='w-1/5 h-full flex items-center justify-center'>Jemi</div>
                <div className='w-1/5 h-full flex items-center justify-center'>Tölegi</div>
                <div className='w-1/5 h-full flex items-center justify-center'>Ýagdaýy</div>
            </div>
            {data && data.map(e => (
                <div className='flex h-16 border bg-white'>
                    <div className='w-2/12 h-full flex items-center justify-center'>{e.id}</div>
                    <div className='w-1/5 h-full flex items-center justify-center'>{e.createdAt}</div>
                    <div className='w-1/5 h-full flex items-center justify-center'>{e.total}</div>
                    <div className='w-1/5 h-full flex items-center justify-center'>{e.payment}</div>
                    <div className='w-1/5 h-full flex items-center justify-center'>{e.status}</div>
                </div>
            ))}
            {data && data.length === 0 && <div className='flex justify-center aling-center items-center flex-col w-full my-20'>
                <BsSearch className='text-4xl text-red-500' />
                <p className='font-bold text-xl'>Haryt tapylmady</p>
            </div>}
        </div>
    )
}

export default OrdersHistory