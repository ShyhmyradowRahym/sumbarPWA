import React, { useEffect, useState } from 'react'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { AiFillStar } from 'react-icons/ai'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import axios from 'axios'
import _ from "lodash";
import Loading from '../Components/Loading/Loading'
import service from '../Components/Interceptors/axios'
import BahaModal from '../Components/BahaBermek/BahaModal'
import Modal from '../Components/BahaBermek/Modal'
import { useSelector } from 'react-redux'
import Rating from '../Components/Rating/Rating'
function Teswirler() {
  const [data, setData] = useState(null)
  const [likes, setLikes] = useState(false)
  const handleLike = (id) => {
    setLikes(!likes)
    service.post(`/site-reviews/like/${id}`)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        if (err.response.status === 400) {
          service.delete(`/site-reviews/like/${id}`)
            .then(res => {
              console.log(res.data);
            }).catch(err => {
              console.log(err);
            }
            )
        }
      }
      )
  }
  const handleDisLike = (id) => {
    setLikes(!likes)
    service.post(`/site-reviews/dislike/${id}`)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        if (err.response.status === 400) {
          service.delete(`/site-reviews/like/${id}`)
            .then(res => {
              console.log(res.data);
            }).catch(err => {
              console.log(err);
            }
            )
        }
      }
      )
  }
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`/site-reviews/all`)
      .then(res => {
        setData(res.data)
        setLoading(false)
      }).catch(err => {
        console.log(err);
      }
      )
  }, [likes])
  const [showBaha, setShowBaha] = useState(false)
  const profileShow = useSelector(state => state.profileShow.profileShow)
  const handleBaha = () => {
    setShowBaha(true)
  }
  return (
    <div className='md:w-3/4 px-3 md:px-0 w-full my-5'>
      <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>TESWIRLER</h1>
      {
        !profileShow && showBaha && <BahaModal setShowBaha={setShowBaha} />
      }
      {
        profileShow && showBaha && <Modal setShowBaha={setShowBaha} />
      }
      <div className='border bg-white w-full'>

        <div className='my-2 flex h-20 items-center'>
          <div className='p-2 w-1/2 flex flex-col justify-center'>
            <p className='text-center text-red-600 font-bold text-4xl'>{data && data[2]}</p>
            <div className='flex justify-center'>
              {/* {_.times(bitinBolegi, (i) => (
              <AiFillStar key={i} className='text-yellow-500' />
              ))} */}
              <Rating widthRating={data && (data[2]*100)/5}/>
            </div>
            <p className='text-center text-gray-500'>({data && data[0].length})</p>
          </div>
          <div className='h-20 border bg-black'></div>
          <div className='w-1/2 flex justify-center items-center'>
            <button onClick={() => handleBaha()} className='py-2 px-1 text-red-600 transition duration-500 ease-in-out hover:text-white hover:bg-red-600 border border-red-600'>Baha berin</button>
          </div>
        </div>
        <div className=''>
          {loading && <Loading loading={loading} />}
          {
            data && data[0].map(e => (
              <div>
                <div className='w-11/12 mx-auto bg-gray-300' style={{ height: '1px' }}></div>
                <div className='w-11/12 mx-auto mt-2 flex justify-between items-center'>
                  <div className='flex items-center'>
                    {_.times(e.stars, () => (
                      <AiFillStar className='text-yellow-500' />
                    ))}
                    <p className='text-sm ml-2'>{e.status}</p>
                  </div>
                  <div className='text-gray-400 flex'>
                    <div onClick={() => handleLike(e.id)} className='cursor-pointer flex items-center mr-5'>
                      <AiFillLike /><p className='ml-0.5 text-sm text-black'>{e.likes}</p>
                    </div>
                    <div onClick={() => handleDisLike(e.id)} className='cursor-pointer flex items-center'>
                      <AiFillDislike /><p className='ml-0.5 text-sm text-black'>{e.dislikes}</p>
                    </div>
                  </div>
                </div>
                <div className='w-11/12 mx-auto flex flex-col'>
                  <div className='flex items-center'>
                    <IoPersonCircleSharp className='mr-1 text-lg text-gray-400' />
                    <p className='text-sm font-bold'>{e.name}</p>
                  </div>
                  <p className='pb-2 text-sm'>{e.review}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Teswirler
