import React from 'react'
import Slider from "react-slick";
import { movieImageBaseUrl } from '../../../Config';
import "../../../../slick/slick.css"
import "../../../../slick/slick-theme.css"

function SimilarInfo(props) {
    const { items } = props;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <>
            <h2 style={{marginTop: '3%'}}>비슷한 영화</h2>
            <div style={{width: '95%', margin: '0 auto'}}>
                <Slider {...settings}>
                    {items.map(item => (
                        <div key={item.title}>
                            <div><a href={item.id}><img src={`${movieImageBaseUrl}original${item.poster_path}`} width="90%" height="320px" alt={item.title}></img></a></div>
                            <div className="movie_name">{item.title}</div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default SimilarInfo
