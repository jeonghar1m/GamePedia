import React from 'react';
import {movieImageBaseUrl} from '../../../Config';

function CreditsInfo(props) {
    const {credits} = props;
    const director = credits.crew.filter(crew => (crew.job === "Director"));

    for(let index = 0; index < director.length; index++)
        if(director[index].profile_path !== null)
            director[index].profile_path = `${movieImageBaseUrl}original${director[index].profile_path}`
        else
            director[index].profile_path = 'https://i.imgur.com/v2uZO3u.jpg';

    console.log(director);
    
    return (
        <div>
            <p><b>감독</b></p>
            <div className="container">
                <div className="row">
                    {director.map(director => (
                        <div className="col col-xl-3 col-md-6 col-12" key={director.name}>
                            <div><img src={director.profile_path} width="100%" height="95%" alt={director.profile_path}></img></div>
                            <div className="person_name">{director.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <p><b>출연</b></p>
            <div className="container">
                <div className="row">
                    {credits.cast.map(cast => (
                        <div className="col col-xl-3 col-md-6 col-12" key={cast.name}>
                            <div><img src={cast.profile_path} width="100%" height="95%" alt={cast.profile_path}></img></div>
                            <div className="person_name">{cast.name} - {cast.character} 역</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreditsInfo
