import React from 'react'

function HasabaGir() {
    return (
        <div className='absolute'>
            <div id="popup-modal" tabindex="-1" class="bg-opacity-30 bg-black flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className='border-b py-5 flex justify-between px-5 items-center'>
                            <p className='text-black text-xl'>Hasabyma gir</p>
                            <button type="button" class="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div class="px-5 py-2 pb-8">
                            <p>Telefon belgiňiz <span className='text-red-600'>*</span></p>
                            <div className='py-2 flex items-center'>
                                <label className='p-2 bg-gray-200 h-full' htmlFor='hasap'>+993</label>
                                <input type="text" id='hasap' className="ring-red-500 outline-red-600 block items-center py-2 p-1 pl-2 w-full text-sm text-gray-900  bg-white rounded-r border" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HasabaGir