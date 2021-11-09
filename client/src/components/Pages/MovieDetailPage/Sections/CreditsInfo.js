import React from 'react';

function CreditsInfo(props) {
    const {credits, director} = props;
    
    return (
        <div>
            <p><b>감독</b></p>
            <div className="container">
                <div className="row">
                    {director.map(director => (
                        <div className="col col-xl-3 col-md-6 col-12" key={director.name}>
                            <div><a href={`../credit/${director.id}`}><img src={director.profile_path} width="100%" height="320px" alt={director.profile_path} /></a></div>
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
                            <div><a href={`../credit/${cast.id}`}><img src={cast.profile_path} width="100%" height="320px" alt={cast.profile_path} /></a></div>
                            <div className="person_name">{cast.name} - {cast.character} 역</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreditsInfo
