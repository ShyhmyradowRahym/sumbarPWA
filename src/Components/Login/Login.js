import React, { useState } from 'react'
import { MdSecurity } from 'react-icons/md'
import Sign from '../SignIn/Sign'
import axios from 'axios'
import { handleProfileShow } from '../../Features/profileSlice'
import { useDispatch } from 'react-redux'
const Login = ({ setHasabymModal, SetSignShow }) => {
    const [phone, setPhone] = useState('')
    const [sms, setSms] = useState('')
    const [phoneShow, setPhoneShow] = useState(true)
    const [smsShow, setSmsShow] = useState(false)
    const [kod, setKod] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const handlePhone = () => {
        // SetSignShow(true)
        // setHasabymModal(false)
        axios.post('http://95.85.127.250:3001', { 'phone': phone })
            .then(res => {
                console.log(res.data);
                if (res.status === 201) {
                    axios.post('http://192.168.31.202:3003', { 'phone': phone, 'password':res.data.toString() })
                        .then(res => {
                            console.log('phone ugradyldy');
                            if (res.status === 200) {
                                setSmsShow(true)
                                setError(null)
                                setKod(true)
                                setPhoneShow(false)
                            }
                        }).catch(err => {
                            setError(err.response.data.message)
                        })
                }
            }).catch(err => {
                setError(err.response.data.message)
            }
            )
    }
    const handleSms = () => {
        axios.post('http://95.85.127.250:3001/confirm', { 'phone': phone, 'password': sms })
            .then(res => {
                if (res.status === 201) {
                    axios.post('/users/login', { 'id': res.data.id })
                        .then(res => {
                            localStorage.setItem("accessToken", res.data.accessToken)
                            localStorage.setItem("refreshToken", res.data.refreshToken)
                            dispatch(handleProfileShow(true))
                            setHasabymModal(false)
                            setError(null)
                        }).catch(err => {
                            setError(err.response.data.message)
                        })
                }
                if (res.status === 200) {
                    SetSignShow(true)
                    setError(null)
                    setHasabymModal(false)
                }
            }).catch(err => {
                setError(err.response.data.message)
            }
            )
    }
    return (
        <div className="login bg-opacity-30 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full">
            <div
                data-aos="fade-down"
                className="relative p-4 w-full max-w-md h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <div className='border-b py-5 flex justify-between px-5 items-center'>
                        <p className='text-black text-xl'>Hasabyma gir</p>
                        <button onClick={() => setHasabymModal(false)} type="button" className="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div class="px-5 py-2 pb-8">
                        {error && <p className='text-center text-white bg-red-600 py-2 mb-2'>{error}</p>}
                        <p className='text-black'>Telefon belgiňiz <span className='text-red-600'>*</span></p>
                        <div className='py-2 flex items-center'>
                            <label className='text-black p-2 bg-gray-200 h-full' htmlFor='hasap'>+993</label>
                            <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" id='hasap' className="ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                        </div>
                        {kod && <p className='text-xs'>Telefon belgiňize kod ugradyldy</p>}
                        {phone.length == 8 && phoneShow && <button type='submit' onClick={() => handlePhone()} className='w-full cursor-pointer mt-4 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                            <p>Telefon belgini tassyklamak</p>
                        </button>}
                        {smsShow && <div>
                            <p className='text-black mt-4'>Telefon belginiň kody <span className='text-red-600'>*</span></p>
                            <div className='py-2 flex items-center'>
                                <label className='text-black p-3 text-md bg-gray-200 h-full' htmlFor='sms'><MdSecurity /></label>
                                <input onChange={(e) => setSms(e.target.value)} value={sms} type="text" id='sms' className="ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                            </div>
                        </div>}
                        {sms.length === 6 && <button onClick={() => handleSms()} type='submit' className='w-full cursor-pointer mt-4 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                            <p>Telefon belgini tassyklamak</p>
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login