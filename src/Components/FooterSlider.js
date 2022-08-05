import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
import { Link } from 'react-router-dom';
function FooterSlider() {
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };
    const [data, setData] = useState(null)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`/main-page/brands`);
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])
    return (
        <div className='w-full border-box container mx-auto py-3' style={{ zIndex: '-9999' }}>
            <Slider {...settings}>
                {data && data.map((e,k) => (
                    <div className='px-2' key={k}>
                        <Link to={`/brands?title=${e.company}`}>
                            <img src={e.logo} className='h-24 w-full cursor-pointer' />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default FooterSlider
