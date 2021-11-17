import React from 'react';
import Slider from "react-slick";
import "../../../../slick/slick.css"
import "../../../../slick/slick-theme.css"

function CreditsInfo(props) {
    const {credits, director} = props;
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <div>
            <p><b>감독</b></p>
            <div className="container">
                <div className="row">
                    {director.map(director => (
                        <div className="col col-xl-3 col-md-6 col-12" key={director.name}>
                            <div><a href={`../credit/${director.id}`}><img src={director.profile_path} width="90%" height="320px" alt={director.profile_path} /></a></div>
                            <div className="person_name">{director.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <p><b>출연</b></p>
            <div className="container">
                <div className="row" style={{width: '95%', margin: '0 auto', marginBottom: '5%'}}>
                    <Slider {...settings}>
                        {credits.cast.map(cast => (
                            <div className="col col-xl-3 col-md-6 col-12" key={cast.name}>
                                <div><a href={`../credit/${cast.id}`}><img src={cast.profile_path} width="90%" height="320px" alt={cast.profile_path} /></a></div>
                                <div className="person_name">{cast.name} - {cast.character} 역</div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default CreditsInfo
