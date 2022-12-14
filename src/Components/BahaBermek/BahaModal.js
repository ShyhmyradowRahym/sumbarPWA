import React, { useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import Login from '../Login/Login'

const BahaModal = ({ setShowBaha }) => {
    const [hasabymModal, setHasabymModal] = useState(false)
    return (
        <div id="popup-modal" tabindex="-1" class="bg-opacity-30 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal h-full">
            {hasabymModal && <Login setHasabymModal={setHasabymModal}/>}
            <div
                data-aos="fade-down"
                class="relative p-4 w-full max-w-md h-auto">
                <div class="relative bg-white rounded-lg shadow">
                    <div className='border-b py-5 flex justify-between px-5 items-center'>
                        <p className='text-black text-xl'>BAHA BERIŇ</p>
                        <button onClick={() => setShowBaha(false)} type="button" class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div class="px-5 py-2 pb-8">
                        <p className='text-center py-3 bg-amber-100 text-gray-600'>Teswir ýazmak üçin hasabyňyza giriň.</p>
                        <button onClick={()=>setHasabymModal(true)} type='submit' className='w-full cursor-pointer my-4 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                            <AiFillCaretRight />
                            <p>Hasabyma gir</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BahaModal