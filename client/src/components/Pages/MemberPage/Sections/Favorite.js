import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import '../../../../slick/slick.css';
import "../../../../slick/slick-theme.css"

function Favorite() {
    const [Favorites, setFavorites] = useState([]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    useEffect(() => {
        axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(res => {
                if(res.data.success) {
                    setFavorites(res.data.favorites);
                } else {
                    alert('영화 정보를 가져오는데 실패했습니다.');
                }
            })
    }, [])
    
    return (
        <div style={{ width: '80%', margin: '3rem auto'}}>
            <h2 style={{textAlign: 'left'}}>좋아하는 영화 목록</h2>
            <hr />
            <Slider {...settings}>
                {Favorites.map((favorite, index) => (
                        <div className="col col-xl-3 col-md-6 col-12" key={favorite.movieTitle}>
                            <div><a href={`../movie/${favorite.movieId}`}><img src={favorite.moviePost} width="90%" height="320px" alt={favorite.moviePost} /></a></div>
                            <div className="movie_name">{favorite.movieTitle}</div>
                        </div>
                ))}
            </Slider>
        </div>
    )
}

export default Favorite
