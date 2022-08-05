import React, { useState } from 'react'
import SampleRating from '../SampleRating'
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillCaretRight } from 'react-icons/ai'
import service from '../Interceptors/axios';
const Modal = ({ setShowBaha }) => {
    const [rating, setRating] = useState('')
    const schema = yup.object().shape({
        teswir: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const handleTeswir = (data) => {
        console.log(rating,' ',data.teswir);
        async function getData() {
            try {
                const res = await service.post('/site-reviews', {"stars":rating, "review":data.teswir})
                if (res.status===201){
                    setShowBaha(false)
                    alert('ugradyldy')
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }
    return (
        <div id="popup-modal" tabindex="-1" class="bg-opacity-30 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full">
            <div data-aos="fade-down" class="relative p-4 w-full max-w-lg h-auto">
                <div class="relative bg-white rounded-lg shadow">
                    <div className='mt-8 bg-white border flex flex-col justify-center items-center'>
                        <div className='w-full border-b py-5 flex justify-between px-5 items-center'>
                            <p className='text-black text-xl'>BAHA BERIŇ</p>
                            <button onClick={() => setShowBaha(false)} type="button" class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <p className='text-center text-gray-400 text-xs pt-2'>Reýting 1 - 5 arasynda bolmalydyr.</p>
                        <div className='my-2'><SampleRating rating={rating} setRating={setRating} /></div>
                        <form className='w-full px-4' onSubmit={handleSubmit(data => handleTeswir(data))}>
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
                </div>
            </div>
        </div>
    )
}

export default Modal