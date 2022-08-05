import React, { useState } from 'react'
import { welayatlar } from '../Components/welayatlar'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillCaretRight } from 'react-icons/ai'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import service from '../Components/Interceptors/axios';
import { emptyCart } from '../Features/cartSlice';
function Order() {
    const schema = yup.object().shape({
        tel: yup.string().min(8, "minimum 8 simbol").max(8, "maximum 3 simbol").required('meydany doldur').matches(/^[0-9]*\.?[0-9]*$/, 'dine sifr yaz'),
        name: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
        fam: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
        salgy: yup.string().min(3, "minimum 3 simbol bolmaly").required('meydany doldur'),
    }).required();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const cartProducts = useSelector(state => state.cart.cartProducts)
    let t = 0
    const idS = []
    cartProducts.map(e => {
        idS.push(e.product.id)
        t = t + (e.quantity * e.product.price)
    })
    const dispatch=useDispatch()
    const handleOrder = (data) => {
        async function getData() {
            try {
                const res = await service.post('/product/buy',{'ids':idS, 'phone':data.tel, 'total':t, 'payment':t, 'status':null});
                console.log(res);
                if (res.status===201){
                    dispatch(emptyCart())
                    alert('zakaz kabul edildi')
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }
    let [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState(searchParams.get('p'))
    const [check, setCheck] = useState(searchParams.get('l'))
    return (
        <div className='w-full md:w-3/4 mt-5'>
            <div className='w-full md:w-3/5 px-2 md:px-0 md:mx-auto'>
                <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>SARGYT</h1>
                <form onSubmit={handleSubmit(data => handleOrder(data))}>
                    <label htmlFor="countries" className="block mb-2 text-md font-medium text-gray-900">Eltip bermek üçin şäheriňiz <span className='text-red-500'>*</span></label>
                    <select value={data} onChange={(e) => setData(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-500 focus:border-red-500 block w-full p-2">
                        {welayatlar.map((e, k) => (
                            <option value={k}>{e.title}</option>
                        ))}
                    </select>
                    {welayatlar[data].data.length > 0 &&
                        <select value={check} onChange={e => setCheck(e.target.value)} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-500 focus:border-red-500 block w-full p-2">
                            {welayatlar[data].data.map((e, k) => (
                                <option value={k}>{e}</option>
                            ))}
                        </select>}
                    <div className='mb-2'>
                        <Controller
                            control={control}
                            name='salgy'
                            render={({ field: { onChange, onBlur } }) => {
                                return (
                                    <div className='my-2'>
                                        <label htmlFor="doly" className="block my-2 text-md font-medium text-gray-900">Eltip bermek üçin salgynyz <span className='text-red-500'>(Doly gornusde)*</span></label>
                                        <textarea onChange={onChange} onBlur={onBlur} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none" id="doly" rows="3" />
                                        <p className='text-red-500'>{errors.salgy?.message}</p>
                                    </div>
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name='name'
                            render={({ field: { onChange, onBlur } }) => {
                                return (
                                    <div className='my-2'>
                                        <label htmlFor='name' className='font-medium'>Adynyz<span className="text-red-500">*</span></label>
                                        <input onChange={onChange} onBlur={onBlur} type="text" id="name" className="focus:border-red-500 focus:outline-none border border-gray-200  placeholder-red-500 text-sm block w-full p-2 mt-1" />
                                        <p className='text-red-500'>{errors.name?.message}</p>
                                    </div>
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name='fam'
                            render={({ field: { onChange, onBlur } }) => {
                                return (
                                    <div className='my-2'>
                                        <label htmlFor='fam' className='font-medium'>Familiyanyz<span className="text-red-500">*</span></label>
                                        <input onChange={onChange} onBlur={onBlur} type="text" id="fam" className="focus:border-red-500 focus:outline-none border border-gray-200  placeholder-red-500 text-sm block w-full p-2 mt-1" />
                                        <p className='text-red-500'>{errors.fam?.message}</p>
                                    </div>
                                )
                            }}
                        />
                        <Controller
                            control={control}
                            name='tel'
                            render={({ field: { onChange, onBlur } }) => {
                                return (
                                    <div className='my-2'>
                                        <label htmlFor='tel' className='font-medium'>Telefon belgiňiz <span className="text-red-500">*</span></label>
                                        <input onChange={onChange} onBlur={onBlur} type="tel" id="tel" className="focus:border-red-500 focus:outline-none border border-gray-200  placeholder-red-500 text-sm block w-full p-2 mt-1" />
                                        <p className='text-red-500'>{errors.tel?.message}</p>
                                    </div>
                                )
                            }}
                        />
                        <label htmlFor="bellik" className="block my-2 text-md font-medium text-gray-900">Bellikleriňiz</label>
                        <textarea className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none" id="bellik" rows="3" />
                        <div className='flex flex-col mt-2'>
                            <p className="block text-md font-medium text-gray-900">Tolegin gornusi <span className='text-red-500'>*</span></p>
                            <div className='flex items-center'>
                                <input type="radio" id="nagt" name="toleg" value="NAGT" />
                                <label htmlFor="nagt" className='mx-1'>Nagt toleg</label><br />
                                <input type="radio" className='bg-red-500 ml-4 mr-1' id="nagtdal" name="toleg" value="NAGTDAL" />
                                <label htmlFor="nagtdal">Online toleg</label><br />
                            </div>
                        </div>
                        <div class="mt-6 relative overflow-x-auto shadow-md mb-4">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">
                                            Harytlar
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            {t} TMT
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b odd:bg-white even:bg-gray-200">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Eltip bermek
                                        </th>
                                        <td class="px-6 py-4">
                                            0 TMT
                                        </td>
                                    </tr>
                                    <tr class="border-b odd:bg-white even:bg-gray-200">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Jemi
                                        </th>
                                        <td class="px-6 py-4 text-red-500">
                                            {t} TMT
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type='submit' className='w-full cursor-pointer mb-4 h-10 flex items-center bg-red-600 text-white rounded justify-center'>
                            <AiFillCaretRight />
                            <p>Sargydy tassyklamak</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Order