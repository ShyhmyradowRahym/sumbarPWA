import React, { useState } from 'react'

import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
const Accordion = ({ data }) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <article className='bg-white border'>
            <header onClick={() => setExpanded(!expanded)} className='cursor-pointer px-3 flex justify-between'>
                <h4 className='py-2 font-bold text-sm'>
                    {data.title}
                </h4>
                <button className='text-sm opacity-40'>
                    {expanded ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </button>
            </header>
            {expanded &&
                <ul className='border-t'>
                    {data.data.map(e => (
                        <li className='flex items-center px-3 py-1 hover:bg-red-300'>
                            <input className='md:mr-2 cursor-pointer' id={e} name={e} type={'checkbox'} />
                            <label htmlFor={e} className='text-sm cursor-pointer'>{e}</label>
                        </li>
                    ))}
                </ul>}
        </article>
    )
}

export default Accordion