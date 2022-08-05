import React, { useEffect, useState } from 'react'
import { BiDownload } from 'react-icons/bi'
const PWA = () => {
  const [scroll, setScroll] = useState("right-5");
  const listenScrollEvent = () => {
    if (window.scrollY < 250) {
      return setScroll('right-5')
    } else if (window.scrollY >= 250) {
      return setScroll('right-20')
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  let deferredPrompt;
  const addBtn = document.getElementById('add-button');
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  }, [])
  return (
    <div>
      <button
        id='add-button'
        style={{ zIndex: '9999' }}
        className={`fixed bottom-10 bg-red-600 px-2.5 py-1 rounded ${scroll}`}
      >
        <BiDownload className='text-2xl text-white' /></button>
    </div>
  )
}

export default PWA