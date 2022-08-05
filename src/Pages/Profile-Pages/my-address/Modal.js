import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiFillCaretRight } from 'react-icons/ai';
import service from '../../../Components/Interceptors/axios';
const Modal = ({ setShowModal }) => {
    const schema = yup.object().shape({
        text: yup.string().min(5, "minimum 5 simbol bolmaly").required('meydany doldur')
    }).required();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const handleModal = (data) => {
        async function getData() {
            try {
                const response = await service.post('/users/address', { 'address': data.text })
                if (response.status === 201) {
                    
                    setShowModal(false)
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }
    return (
        <div className='anbsolute'>
            <div id="popup-modal" tabindex="-1" class="bg-opacity-30 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full">
                <div data-aos="fade-down" class="relative p-4 w-full max-w-lg h-auto">
                    <div class="relative bg-white rounded-lg shadow">
                        <div className='border-b py-5 flex justify-between px-5 items-center'>
                            <p className='text-black text-xl'>TÄZE SALGY GOŞMAK</p>
                            <button onClick={() => setShowModal(false)} type="button" class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(data => handleModal(data))} className='px-4'>
                            <div class="px-2 py-2 pb-8">
                                <Controller
                                    control={control}
                                    name='text'
                                    render={({ field: { onChange, onBlur } }) => {
                                        return (
                                            <div className='my-2'>
                                                <label htmlFor="text" className="block my-2 text-md font-medium text-gray-900">Salgy <span className='text-red-500'>*</span></label>
                                                <textarea onChange={onChange} onBlur={onBlur} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none" id="text" rows="4" />
                                                <p className='text-red-500'>{errors.text?.message}</p>
                                            </div>
                                        )
                                    }}
                                />
                                <button type='submit' className='transition duration-500 ease-in-out hover:bg-black w-full cursor-pointer mt-6 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                                    <AiFillCaretRight />
                                    <p>Ýatda sakla</p>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal