import React from 'react'
import { LightgalleryItem } from "react-lightgallery";
import { LightgalleryProvider } from "react-lightgallery";
function About() {
  return (
    <div className='md:w-3/4 px-3 md:px-0 md:mt-5 mt-0 w-full flex flex-col'>
      <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>BIZ BARADA</h1>
      <div className='flex md:flex-row flex-col w-full'>
        <div className='w-full md:w-4/5'>
          <p><span className='font-bold text-red-600'>“Sumbar Computer”</span> dükany 2010-njy ýylda esaslandyryldy we korporatiw pudak we hususy müşderiler üçin IT enjamlarynyň ähli toplumynyň ygtybarly üpjün edijisi bolup durýar. Kompýuter enjamlarynyň bölek we lomaý satuw dükany.</p>
          <p className='my-2'><span className='font-bold text-red-600'>“Sumbar Computer”</span> şu harytlaryň dürli görnüşlerini hödürleýär: şahsy kompýuterler, aýratyn toplumlaşdyryjylar, noutbuklar, periferiýa gurluşlary, kompýuter esbaplary, printerler, ofis guramaçylykly tehnikasy, öýjükli periferiýa we dünýäniň öňdebaryjy <a href=''>öndürijilerinden</a> başga harytlar.</p>
          <p className='font-bold my-1'>SC-niň esasy harytlary:</p>
          <div className='ml-5'>
            <li>Şahsy kompýuterler, monobloklar;</li>
            <li>Ofis we oýun noutbuklary;</li>
            <li>Oýunçylar üçin toplumlaşdyryjy enjamlar we periferiýa enjamlary;</li>
            <li>Üznüksiz elektrik üpjünçiligi ulgamlary we bloklary;</li>
            <li>Ofis enjamlary we guramaçylykly tehnika;</li>
            <li>Ulgamlaýyn enjamlar;</li>
            <li>Dürli görnüşli periferiýa enjamlary, sarp ediş materiallary we ş.m.</li>
          </div>
          <p className='font-bold my-4'>Korporatiw müşderiler üçin enjamlar bilen üpjün etmek we taslamalary durmuşa geçirmek üçin hyzmatlaryň doly toplumy hödürlenýär:</p>
          <div className='ml-5'>
            <li>Kiçi, orta we iri kärhanalar üçin täjirçilik enjamlaryny satyn almakda ýörite meýilleşdirilen bahalar göz öňünde tutulýar;</li>
            <li>Döwlet buýrujysyna öndürijiler bilen bilelikde ylalaşylan ýa-da işlenip düzülen taslamalar üçin aýratyn arzanladyşlar bilen döwlet pudagyna harytlary işjeň üpjün edýäris;</li>
          </div>
        </div>
        <div className='md:ml-1 mt-1 md:w-2/5 w-full '>
          <img src='https://sumbar-computer.com/img/page/about-us-3.JPG' />
          <img src='https://sumbar-computer.com/img/page/about-us-2.JPG' className='my-3' />
          <img src='https://sumbar-computer.com/img/page/about-us-1.JPG' />
        </div>
      </div>
    </div>
  )
}

export default About

  // < LightgalleryProvider >
  // <div className='flex md:w-3/4 bg-red-500 w-full md:mt-5 mt-0' style={{ height: '999px' }}>
  //   <LightgalleryItem src="https://picsum.photos/1024/768?image=2">
  //     <img src="https://picsum.photos/200/300?image=2" />
  //   </LightgalleryItem>
  //   <LightgalleryItem src="https://picsum.photos/1024/768?image=2">
  //     <img src="https://picsum.photos/200/300?image=2" />
  //   </LightgalleryItem>
  //   <LightgalleryItem src="https://picsum.photos/1024/768?image=2">
  //     <img src="https://picsum.photos/200/300?image=2" />
  //   </LightgalleryItem>
  // </div>
  // < /LightgalleryProvider >