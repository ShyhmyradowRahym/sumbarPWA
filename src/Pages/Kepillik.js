import React from 'react'
function Kepillik() {
  return (
    <div className='md:w-3/4 md:px-0 px-3 w-full my-5'>
      <h1 className='mb-4 sm:mt-0 mt-5 text-center text-2xl font-bold'>KEPILLIK</h1>
      <p className='font-bold my-2'>Kepilligiň şertleri:</p>
      <p>Aşakda görkezilen kepillikli şertler sarp edijä we şol bir wagtda ýerine ýetirijä hem degişlidir. Bu şertler Türkmenistanyň döwlet syýasatynyň guramaçylyk-hukuk, durmuş-ykdysady esaslaryny we sarp edijileri goramak babatyndaky kanunyň esaslaryny düzýär.</p>
      <div className='flex md:flex-row flex-col'>
        <div className='w-full md:w-4/5'>
          <p className='my-1 font-bold'>I. Kepilligiň borçnamalary</p>
          <ol className='ml-10'>
            <li style={{ listStyleType: 'number' }}>Öndüriji tarapyndan kesgitlenen kepillik möhleti bolmadyk ýagdaýynda, şeýle hem gulluk möhleti döwründe kepillik berilmeýän komponentli harytlardan başgalaryna (sarp ediş materiallary, kartrijler, CD-DVD diskleri, sumkalar, metal we plastmassa önümleri, podstawkalar, berkidijiler, kabeller, gurallar, elektron komponentleri bolmadyk harytlar, şeýle hem programma üpjünçiligi, islendik operasion ulgamy, programmalar we ş.m.) ýerine yetiriji harytlara kepilligiň möhletini kesgitlemäge borçludyr.</li>
            <li style={{ listStyleType: 'number' }}>Şertnamada başga düzgün göz öňünde tutulmadyk bolsa, harytlara kepillikli möhlet harydyň sarp edijä satylan gününden hasaplanýar.</li>
            <li style={{ listStyleType: 'number' }}>Kepillik möhleti harytlaryň toplumyna we esasy harydyň gurluş böleklerine berilip biliner, mysal üçin: ýygnalan kompýutere we onuň toplumlaşdyryjy böleklerine kepillikli möhletler bellenip bilner.</li>
          </ol>
          <p className='my-5 font-bold'>II. Sarp edijiniň harydyň satyn alnandygyny tassyklaýan resminamany satyjydan (ýerine ýetirijiden) almak hukugy</p>
          <ol className='ml-10'>
            <li style={{ listStyleType: 'number' }}>Sarp edijiniň harydyň satyn alnandygyny tassyklaýan resminamany satyjydan (ýerine ýetirijiden) almaga hukugy bar. Harytlaryň satyn alnandygyny tassyklaýan resminama hökmünde kassa ýa-da haryt töleghaty, girdeji kassa orderi, kesilen talonyň töleghaty, töleg tabşyrygy ýa-da harytlaryň ady, bahasy, harydyň satyn alnan senesi, satyjy (ýerine ýetiriji) barada maglumatlary öz içine alýan resminama kabul edilýär.</li>
            <li style={{ listStyleType: 'number' }}>Satyjy (ýerine ýetiriji) haryt satylanda, sarp edijä harydyň satyn alnandygyny tassyklaýan resminama bermäge borçludyr.</li>
          </ol>
        </div>
        <div className='md:ml-2 mt-2 md:w-2/5 w-full '>
          <img src='https://sumbar-computer.com/img/page/guarantee-1.JPG' />
        </div>
      </div>
    </div>
  )
}

export default Kepillik
