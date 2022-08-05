import React, { useEffect, useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import { BsSearch, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import service from '../../../Components/Interceptors/axios'
import Modal from './Modal'

const MyAddress = () => {
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const handleDelete=(id) => {
    async function getData() {
      try {
        const res = await service.delete(`/users/address/${id}`)
        if (res.status===200) {window.location.reload()}
      } catch (error) {
        console.error(error);
      }
    }
    getData()
  }
  useEffect(() => {
    async function getData() {
      try {
        const res = await service.get('/users/address')
        setData(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData()
  }, [showModal])
  const profileShow = useSelector(state => state.profileShow.profileShow)
    useEffect(()=>{
        !profileShow && window.location.replace('/')
    },[])
  return (
    <div className='md:w-3/4 px-3 md:px-0 md:mt-5 mt-0 w-full flex flex-col'>
      <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>SALGYLARYM</h1>
      <button onClick={() => setShowModal(true)} className='cursor-pointer mb-4 h-10 flex items-center transition duration-500 ease-in-out hover:bg-black bg-red-600 text-white rounded justify-center'>
        <AiFillCaretRight />
        <p>Täze salgy goşmak</p>
      </button>
      {showModal && <Modal setShowModal={setShowModal} />}
      {data && data.map(e => (
        <div className='h-16 px-2 flex items-center justify-between border bg-white w-full'>
          <p>{e.address}</p>
          <BsTrash className='text-red-600' onClick={() => handleDelete(e.id)} />
        </div>
      ))}
      {data && data.length === 0 && <div className='flex justify-center aling-center items-center flex-col w-full my-20'>
        <BsSearch className='text-4xl text-red-500' />
        <p className='font-bold text-xl'>Salgy: tapylmady</p>
      </div>}
    </div>
  )
}
export default MyAddress