import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import { Link } from 'react-router-dom';
function SliderMain() {
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };
    const [data, setData] = useState(null)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('/main-page/big-images');
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])
    console.log(data);
    return (
        <div className='w-full border-box' style={{ zIndex: '-9999' }}>
            <Slider {...settings}>
                {data && data.map((e,k) => (
                    <Link to={`/product/${e.id}`}><img key={k} src={e} className='w-full h-48 md:h-auto cursor-pointer' /></Link>
                ))}
            </Slider>
        </div>
    )
}

export default SliderMain
