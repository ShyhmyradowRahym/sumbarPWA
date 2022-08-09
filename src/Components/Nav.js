import React, { useEffect, useReducer } from 'react'
import { BsFilterLeft } from "react-icons/bs";
import { RiArrowDropRightFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import axios from 'axios'
import _ from "lodash";
import Loading from './Loading/Loading';
import Teswir from './Teswir';

const initialValue = {
  loading: false,
  data: null
}
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      }
    case "GET_DATA":
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}
function Nav() {

  const [state, dispatch] = useReducer(reducer, initialValue);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`/menu`);
        if (res.data) { dispatch({ type: 'GET_DATA', payload: res.data }) }
        dispatch({ type: 'SET_LOADING', payload: false })
      } catch (error) {
        console.error(error);
      }
    }
    getData()
    dispatch({ type: 'SET_LOADING', payload: true })
  }, [])
  console.log(state.category, ' ', state.loading);
  return (
    <div className='md:w-2/5 lg:w-1/4 w-full'>
      <div
        className='md:mt-5 md:flex hidden container mx-auto mb-1'>
        <section className='w-full md:mr-6 mr-0 flex flex-col'>
          <Link to='/all' className='transition hover:bg-black duration-500 ease-in-out md:flex hidden rounded-t-md items-center p-2 py-3 bg-red-600 w-full text-white font-bold rounded-top-xl'>
            <BsFilterLeft className='lg:ml-5 ml-1 text-2xl' /> <p className='ml-1 text-sm'>AHLI HARYTLAR</p>
          </Link>
          {
            state.loading && <Loading loading={state.loading} />
          }
          {/* {nav && <div onClick={() => setShowCat(!showCat)} className='cursor-pointer mt-2 md:flex hidden items-center px-2 py-2 bg-gray-700 w-full text-white font-bold'>
            <TiArrowDown className='lg:ml-5 ml-1 text-2xl' />
            <p className='text-sm'>KATEGORIYALAR</p>
          </div>} */}
          {state.data &&
            state.data.map((e, k) => (
              <div key={k} className="relative cursor-pointer md:p-0 bg-white">
                <div className='peer border h-12 border p-2 w-full flex items-center justify-between'>
                  {e.subCategory.length > 0 ? <div className='flex items-center'>
                    <img src={e.imageUrl} className='mr-2 w-10 h-6' /> <p className='text-md'>{e.title}</p>
                  </div> :
                    <Link to={`/category?cat=${e.id}&title=${e.title}`} className='w-full'>
                      <div className='flex items-center'>
                        <img src={e.imageUrl} className='mr-2 w-10 h-6' /> <p className='text-md'>{e.title}</p>
                      </div>
                    </Link>
                  }
                  {e.subCategory.length > 0 && <RiArrowDropRightFill className='text-3xl opacity-40' />}
                </div>
                {e.subCategory.length > 0 &&
                  <div className='w-full border md:w-72 peer-hover:flex hover:flex hidden md:absolute top-0 -right-72 bg-white z-10'>
                    <div className="flex flex-col w-full m-2">
                      {e.subCategory.map((r, i) => (
                        <div key={i} className='flex items-center hover:bg-gray-200 h-12'>
                          <img src={r.imageUrl} className='mr-1 w-10 h-8' />
                          <Link to={`/category?cat=${e.id}&subCat=${r.id}&title=${r.title}`} className='w-full p-2 text-md'>{r.title}</Link>
                        </div>
                      ))
                      }
                    </div>
                  </div>}
              </div>
            ))
          }
          {/* {nav &&
            <div className='my-3'>
              {category1.map(data => (
                <Accordion key={data} data={data} />
              ))}
              <div className='text-white flex items-center hover:bg-black transition duration-500 easy-in-out justify-center rounded-3xl mt-2 bg-gray-400 w-full text-center py-1 cursor-pointer'>
                <BsEraserFill className='mr-0.5 text-white' />
                <p>Arassala</p>
              </div>
            </div>
          } */}
        </section>
      </div >

      <div className='md:block hidden'>
        <Teswir />
      </div>
    </div>
  )
}

export default Nav
