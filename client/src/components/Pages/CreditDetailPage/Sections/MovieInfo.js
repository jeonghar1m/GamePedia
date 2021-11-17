import React from 'react';
import Slider from "react-slick";
import { movieImageBaseUrl } from '../../../Config';
import '../../../../slick/slick.css'
import '../../../../slick/slick-theme.css'

function MovieInfo(props) {
    const { cast, crew } = props;
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <div>
            {(cast.length > 0) &&
                <div>
                    <h5>출연</h5>
                    <div className="container">
                        <div className="row" style={{width: '95%', margin: '0 auto', marginBottom: '5%'}}>
                            <Slider {...settings}>    
                                {cast && cast.map(item => (
                                    <div className="col col-xl-3 col-md-6 col-12" key={item.title}>
                                        {(item.poster_path !== null) &&
                                            <div><a href={`../movie/${item.id}`}><img src={`${movieImageBaseUrl}original${item.poster_path}`} width="90%" height="320px" alt={item.title}></img></a></div>
                                        }
                                        {(item.poster_path === null) &&
                                            <div><a href={`../movie/${item.id}`}><img src="/img/no-image.png" width="95%" height="320px" alt={item.title}></img></a></div>
                                        }
                                        <div className="movie_name">{item.title}</div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            }
            {(crew.length > 0) &&
                <div style={{margin: '1% 0 0 0'}}>
                    <h5>감독</h5>
                    <div className="container">
                        <div className="row" style={{width: '95%', margin: '0 auto', marginBottom: '5%'}}>
                            <Slider {...settings}>
                                {crew && crew.map(item => (
                                    <div className="col col-xl-3 col-md-6 col-12" key={item.title}>
                                        {(item.poster_path !== null) &&
                                            <div><a href={`../movie/${item.id}`}><img src={`${movieImageBaseUrl}original${item.poster_path}`} width="90%" height="320px" alt={item.title}></img></a></div>
                                        }
                                        {(item.poster_path === null) &&
                                            <div><a href={`../movie/${item.id}`}><img src="/img/no-image.png" width="95%" height="320px" alt={item.title}></img></a></div>
                                        }
                                        <div className="movie_name">{item.title}</div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieInfo
