import React, { useState } from 'react'

import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import { Link } from 'react-router-dom';
const AccordionHeader = ({ data, setShowMenu }) => {
    console.log(data);
    const [expanded, setExpanded] = useState(false)
    return (
        <article className='bg-white border'>
            <header onClick={() => setExpanded(!expanded)} className={expanded ? 'bg-gray-50 cursor-pointer px-3 flex justify-between' : 'cursor-pointer px-3 flex justify-between'}>
                <h4 className='py-2 font-bold text-sm w-full'>
                    {data.subCategory.length === 0 ?
                        <Link onClick={() => setShowMenu(false)} className='w-full flex items-center' to={`/category?cat=${data.id}&title=${data.title}`} >
                            <img src={data.imageUrl} className='mr-2 w-8 h-6' />
                            <p>{data.title}</p>
                        </Link>
                        :
                        <div className='flex items-center'>
                            <img src={data.imageUrl} className='mr-2 w-8 h-6' />
                            <p>{data.title}</p>
                        </div>
                    }
                </h4>
                {data.subCategory.length > 0 && <button className='text-sm opacity-40'>
                    {expanded ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </button>}
            </header>
            {expanded &&
                <ul className='border-t'>
                    {data.subCategory.map(e => (
                        <li className='flex items-center px-3 py-1 hover:bg-gray-100'>
                            <Link className='w-full flex items-center' to={`/category?cat=${data.id}&subCat=${e.id}&title=${e.title}`}>
                                <img src={e.imageUrl} className='mr-2 w-8 h-6' />
                                <p onClick={() => setShowMenu(false)}>{e.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>}
        </article>
    )
}

export default AccordionHeader