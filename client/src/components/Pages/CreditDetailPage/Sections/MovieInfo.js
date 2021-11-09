import React from 'react';
import { movieImageBaseUrl } from '../../../Config';

function MovieInfo(props) {
    const { cast, crew } = props;

    return (
        <div>
            {(cast.length > 0) &&
                <div>
                    <h5>출연</h5>
                    <div className="container">
                        <div className="row">
                            {cast && cast.map(item => (
                                <div className="col col-xl-3 col-md-6 col-12" key={item.title}>
                                    {(item.poster_path !== null) &&
                                        <div><a href={`../movie/${item.id}`}><img src={`${movieImageBaseUrl}original${item.poster_path}`} width="100%" height="320px" alt={item.title}></img></a></div>
                                    }
                                    {(item.poster_path === null) &&
                                        <div><a href={`../movie/${item.id}`}><img src="/img/no-image.png" width="100%" height="320px" alt={item.title}></img></a></div>
                                    }
                                    <div className="movie_name">{item.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {(crew.length > 0) &&
                <div style={{margin: '3% 0 0 0'}}>
                    <h5>감독</h5>
                    <div className="container">
                        <div className="row">
                            {crew && crew.map(item => (
                                <div className="col col-xl-3 col-md-6 col-12" key={item.title}>
                                    {(item.poster_path !== null) &&
                                        <div><a href={`../movie/${item.id}`}><img src={`${movieImageBaseUrl}original${item.poster_path}`} width="100%" height="320px" alt={item.title}></img></a></div>
                                    }
                                    {(item.poster_path === null) &&
                                        <div><a href={`../movie/${item.id}`}><img src="/img/no-image.png" width="100%" height="320px" alt={item.title}></img></a></div>
                                    }
                                    <div className="movie_name">{item.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieInfo
