import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillCaretRight } from 'react-icons/ai'
import * as yup from 'yup';
import axios from 'axios'
import { handleProfileShow } from '../../Features/profileSlice';
import { useDispatch } from 'react-redux';
function Sign({ SetSignShow }) {
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        name: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
        phone: yup.string().min(8, "minimum 8 simbol bolmaly").max(8, "max 8 simbol bolmaly").required('meydany doldur'),
        email: yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email addresi dogry ýazyň").min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
    }).required();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [error, setError] = useState(null)
    const handleSign = (data) => {
        axios.post('/users/create', { 'name': data.name, 'phone': data.phone, 'email': data.email })
            .then(res => {
                localStorage.setItem("accessToken", res.data.accessToken)
                localStorage.setItem("refreshToken", res.data.refreshToken)
                if (res.status === 201) {
                    handleProfileShow(true)
                    setError(null)
                    SetSignShow(false)
                    dispatch(handleProfileShow(true))
                }
            }).catch(err => {
                setError(err.response.data.message);
            }
            )
    }
    return (
        <div id="popup-modal" tabindex="-1" className="bg-opacity-30 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full">
            <div data-aos="fade-down" className="relative p-4 w-full max-w-lg h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit(data => handleSign(data))}>
                        <div className='border-b py-5 flex justify-between px-5 items-center'>
                            <p className='text-black text-xl'>Agza bolmak</p>
                            <button onClick={() => SetSignShow(false)} type="button" class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div class="px-5 py-2 pb-8 text-black">
                            {error && <p className='text-center text-white bg-red-600 py-2 mb-2'>{error}</p>}
                            <Controller
                                control={control}
                                name='name'
                                render={({ field: { onChange, onBlur } }) => {
                                    return (
                                        <div className='my-4'>
                                            <label htmlFor='name' className='text-black'>Adynyz <span className='text-red-600'>*</span></label>
                                            <input onChange={onChange} onBlur={onBlur} type="text" id='name' className="focus:border-red-500 focus:outline-none mt-2 border-gray-400 ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                                            <p className='text-red-500'>{errors.name?.message}</p>
                                        </div>
                                    )
                                }}
                            />
                            <Controller
                                control={control}
                                name='phone'
                                render={({ field: { onChange, onBlur } }) => {
                                    return (
                                        <div className='my-4'>
                                            <p className='text-black'>Telefon belgiňiz <span className='text-red-600'>*</span></p>
                                            <div className='py-2 flex items-center'>
                                                <label className='text-black p-2 bg-gray-200 h-full' htmlFor='phone'>+993</label>
                                                <input onChange={onChange} onBlur={onBlur} type='tel' id='phone' className="ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                                            </div>
                                            <p className='text-red-500'>{errors.phone?.message}</p>
                                        </div>
                                    )
                                }}
                            />
                            <Controller
                                control={control}
                                name='email'
                                render={({ field: { onChange, onBlur } }) => {
                                    return (
                                        <div className='my-4'>
                                            <label htmlFor='email' className='text-black'>E-poçtaňyz <span className='text-red-600'>*</span></label>
                                            <input onChange={onChange} onBlur={onBlur} type="text" id='email' className="focus:border-red-500 focus:outline-none mt-2 border-gray-400 ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                                            <p className='text-red-500'>{errors.email?.message}</p>
                                        </div>
                                    )
                                }}
                            />

                            <button type='submit' className='w-full cursor-pointer mt-6 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                                <AiFillCaretRight />
                                <p>Ugrat</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Sign