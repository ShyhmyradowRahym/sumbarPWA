import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'
function SliderMain1() {
    const settings = {
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ]
    };
    const [data, setData] = useState(null)
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('/main-page/small-images');
                setData(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])
    return (
        <div className='w-full' style={{ marginTop: '-5px' }}>
            <Slider {...settings}>
                {data && data.map((e,k) => (
                    <div className='border' key={k}>
                        <img key={k} src={e.imageUrl[0]} className='w-full md:h-48 h-36 cursor-pointer' />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SliderMain1
