import React, { useEffect, useState } from 'react'
import { IoArrowUpSharp } from 'react-icons/io5'
const Scroll = () => {
    const [scroll, setScroll] = useState("");

    const listenScrollEvent = () => {
        if (window.scrollY < 250) {
            return setScroll('hidden')
        } else if (window.scrollY > 250) {
            return setScroll('block')
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);

        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);
    return (
        <div>
            <button onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            }} style={{ zIndex: '9999' }} className={`${scroll} fixed bottom-10 right-5 bg-gray-600 px-2.5 py-1 rounded`}><IoArrowUpSharp className='text-2xl text-white' /></button>
        </div>
    )
}

export default Scroll