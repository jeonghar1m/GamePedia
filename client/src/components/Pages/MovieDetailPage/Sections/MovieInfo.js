import React from 'react'

function MovieInfo(props) {
    const {movie} = props;

    const release_date = new Date(movie.release_date); // 개봉연도만 가져오기 위한 상수 선언

    return (
        <div>
            <p><b>기본 정보</b></p>
            <div>{release_date.getFullYear()} · {movie.production_countries[0].name} · {movie.genres[0].name}</div>
            <div>{movie.runtime}분</div>
            <p style={{margin: '1% 0'}}>{movie.overview}</p>
        </div>
    )
}

export default MovieInfo