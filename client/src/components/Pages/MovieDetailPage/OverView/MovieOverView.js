import React, {useEffect, useState} from 'react';
import { siteTitle, movieLang, countriesLang, movieApiBaseUrl, movieImageBaseUrl, api_key } from '../../../Config';

function MovieOverView(props) {
    const movieId = props.match.params.movieId;

    const [movieItems, setMovieItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const release_date = new Date(movieItems.release_date); // 개봉연도만 가져오기 위한 상수 선언

    const preURL = `../${props.match.params.movieId}`;

    useEffect(() => {
        fetch(`${movieApiBaseUrl}${movieId}?api_key=${api_key}&language=ko-KR`)
            .then(res => res.json())
            .then(data => {
                data.poster_path = `${movieImageBaseUrl}original${data.poster_path}`;

                document.title = `${data.title} - ${siteTitle}`;  // change the title

                // 언어 data값 문자열 한국어로 번역
                for(let index = 0; index < data.spoken_languages.length; index++)
                    data.spoken_languages[index].name = movieLang[data.spoken_languages[index].english_name];
                
                for(let index = 0; index < data.production_countries.length; index++)
                    data.production_countries[index].name = countriesLang[data.production_countries[index].iso_3166_1];
                
                console.log(data);

                setMovieItems(data);
                setLoading(false);
            })
    }, [api_key, movieId])

    return (
        <div>
            {!loading ?
            <section className="inner">
                <div>
                    <p><a href={preURL}>[이전]</a></p>
                    <h2><p>영화 정보</p></h2>
                    <div id="overview">
                        <b>원제</b> {movieItems.original_title}
                        <hr />
                        <b>개봉연도</b> {release_date.getFullYear()}년
                        <hr />
                        <b>국가</b> {movieItems.production_countries.map((countries, index) => (<span key={countries.name}>{countries.name}{(index < movieItems.production_countries.length - 1) ? ',\u00A0' : ''}</span>))}
                        <hr />
                        <b>장르</b> {movieItems.genres.map((genres, index) => (<span key={genres.name}>{genres.name}{(index < movieItems.genres.length - 1) ? ',\u00A0' : ''}</span>))}
                        <hr />
                        <b>상영시간</b> {movieItems.runtime}분
                        <hr />
                        <b>상영언어</b> {movieItems.spoken_languages.map((lang, index) => (<span key={lang.name}>{lang.name}{(index < movieItems.spoken_languages.length -1)? ',\u00A0' : ''}</span>))}
                        <hr />
                        <b>TheMovieDB 평점</b> {movieItems.vote_average}
                        <hr />
                        <b>내용</b><br />
                        {movieItems.overview}
                    </div>
                </div>
            </section>
            :
            <section className="inner">
                <div>loading...</div>
            </section>
            }
        </div>
    )
}

export default MovieOverView
