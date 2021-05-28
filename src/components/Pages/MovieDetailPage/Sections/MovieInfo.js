import React from 'react'

function MovieInfo(props) {
    let {movie} = props;

    return (
        <div>
            <p><a href={movie.homepage} target="_blank"><img src={movie.poster_path} alt="" width="15%" /></a>
            <h2>{movie.title}</h2></p>
            <p>줄거리: {movie.overview}</p>
            <p>개봉일: {movie.release_date}</p>
            <p>상영시간: {movie.runtime}분</p>
            <p>수익: ${movie.revenue}</p>
            <p>
                배급사
                <ul>
                    {movie.production_companies.map(companies => (
                        <li>{companies.name}</li>
                    ))}
                </ul>
            </p>
            <p>
                장르
                <ul>
                    {movie.genres.map(genres => (
                        <li>{genres.name}</li>
                    ))}
                </ul>
            </p>
            <p>
                언어
                <ul>
                    {movie.spoken_languages.map(lang => (
                        <li>{lang.name}</li>
                    ))}
                </ul>
            </p>
        </div>
    )
}

export default MovieInfo
