import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import service from '../../Components/Interceptors/axios';
import { useSelector } from 'react-redux';
const ProfileEdit = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const schema = yup.object().shape({
        name: yup.string().min(5, "minimum 5 simbol bolmaly").required('meydany doldur'),
        email: yup.string().min(5, "minimum 5 simbol bolmaly").required('meydany doldur'),
    }).required();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [user, setUser] = useState(null)
    useEffect(() => {
        async function getData() {
            try {
                const res = await service.get('/users')
                setUser(res.data)
                if (res.status === 200) {
                    setName(res.data.name)
                    setEmail(res.data.email)
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])
    const handleModal = (data) => {
        async function getData() {
            try {
                const res = await service.post('/users/edit', { "name": data.name, "email": data.email })
                if (res.status === 201) {
                    alert('profil uytgedildi')
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }
    const profileShow = useSelector(state => state.profileShow.profileShow)
    useEffect(()=>{
        !profileShow && window.location.replace('/')
    },[])
    return (
        <div className='md:w-3/4 px-3 md:px-0 md:mt-5 mt-0 w-full flex flex-col'>
            <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>PROFILIMI ÜÝTGETMEK</h1>
            <form onSubmit={handleSubmit(data => handleModal(data))} className='px-4 md:w-3/5 w-full mx-auto'>
                <div class="px-2 py-2 pb-8">
                    <Controller
                        control={control}
                        name='name'
                        defaultValue={name}
                        render={({ field: { onChange, onBlur } }) => {
                            return (
                                <div className='my-4'>
                                    <label htmlFor='name' className='text-black'>Adynyz <span className='text-red-600'>*</span></label>
                                    <input defaultValue={name} onChange={onChange} onBlur={onBlur} type="text" id='name' className="focus:border-red-500 focus:outline-none mt-2 border-gray-400 ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                                    <p className='text-red-500'>{errors.name?.message}</p>
                                </div>
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        name='email'
                        defaultValue={email}
                        render={({ field: { onChange, onBlur } }) => {
                            return (
                                <div className='my-4'>
                                    <label htmlFor='email' className='text-black'>E-poçtaňyz <span className='text-red-600'>*</span></label>
                                    <input defaultValue={email} onChange={onChange} onBlur={onBlur} type='text' id='email' className="focus:border-red-500 focus:outline-none mt-2 border-gray-400 ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                                    <p className='text-red-500'>{errors.email?.message}</p>
                                </div>
                            )
                        }}
                    />
                    <button type='submit' className='transition duration-500 ease-in-out hover:bg-black w-full cursor-pointer mt-6 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                        <p>Profilimi üýtgetmek</p>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEdit