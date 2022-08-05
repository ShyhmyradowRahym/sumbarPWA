import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillCaretRight } from 'react-icons/ai'
import * as yup from 'yup';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function NagilelikModal({ setNagilelikModal }) {

    const schema = yup.object().shape({
        username: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
        emailOrPhone: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
        message: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur')
    }).required();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const notify = () => toast.success('Hatyňyz kabul edildi...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const handleNagilelik = (data) => {
        axios.post(`/report`, { "username": data.username, "emailOrPhone": data.emailOrPhone, "message": data.message })
            .then(res => {
                if (res.status === 201) {
                    setNagilelikModal(false)
                    notify()

                }
            }).catch(err => {
                console.log(err);
            }
            )
    }
    return (
        <div id="popup-modal" tabindex="-1" class="bg-opacity-30 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full">
            <div
                data-aos="fade-down"
                class="relative p-4 w-full max-w-lg h-auto">
                <ToastContainer />
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form onSubmit={handleSubmit(data => handleNagilelik(data))}>
                        <div className='border-b py-5 flex justify-between px-5 items-center'>
                            <p className='text-black text-xl'>Nagilelik bildirmek</p>
                            <button onClick={() => setNagilelikModal(false)} type="button" class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div class="px-5 py-2 pb-8 text-black">
                            <Controller
                                control={control}
                                name='username'
                                render={({ field: { onChange, onBlur } }) => {
                                    return (
                                        <div className='my-4'>
                                            <label htmlFor='name' className='text-black'>Adynyz <span className='text-red-600'>*</span></label>
                                            <input onChange={onChange} onBlur={onBlur} type="text" id='name' className="focus:border-red-500 focus:outline-none mt-2 border-gray-400 ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                                            <p className='text-red-500'>{errors.username?.message}</p>
                                        </div>
                                    )
                                }}
                            />
                            <Controller
                                control={control}
                                name='emailOrPhone'
                                render={({ field: { onChange, onBlur } }) => {
                                    return (
                                        <div className='my-4'>
                                            <label htmlFor='phone' className='text-black'>Telefon belgiňiz ýa-da e-poçtaňyz</label>
                                            <input onChange={onChange} onBlur={onBlur} type="text" id='phone' className="focus:border-red-500 focus:outline-none mt-2 border-gray-400 ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                                            <p className='text-red-500'>{errors.emailOrPhone?.message}</p>
                                        </div>
                                    )
                                }}
                            />
                            <Controller
                                control={control}
                                name='message'
                                render={({ field: { onChange, onBlur } }) => {
                                    return (
                                        <div className='my-2'>
                                            <label htmlFor="text" className="block my-2 text-md font-medium text-gray-900">Hatynyz <span className='text-red-500'>*</span></label>
                                            <textarea onChange={onChange} onBlur={onBlur} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none" id="text" rows="4" />
                                            <p className='text-red-500'>{errors.message?.message}</p>
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

export default NagilelikModal 