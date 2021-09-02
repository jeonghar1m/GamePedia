import React, {useEffect, useState} from 'react';
import MovieInfo from './Sections/MovieInfo';
import CreditsInfo from './Sections/CreditsInfo';
import {siteTitle, movieLang, countriesLang, movieApiBaseUrl, movieImageBaseUrl} from '../../Config';

function MovieDetailPage(props) {
    const [movieItems, setMovieItems] = useState([]);
    const [creditsItems, setCreditsItems] = useState([]);
    const [creditsToggle, setCreditsToggle] = useState(false);
    const [isLoadingMovie, setIsLoadingMovie] = useState(true);
    const [isLoadingCredits, setIsLoadingCredits] = useState(true);
    const [mode, setMode] = useState("Loading");
    
    const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;
        
    const movieId = props.match.params.movieId;
    
    const creditsInfo = `${movieApiBaseUrl}${movieId}/credits?api_key=${api_key}`;
    const movieInfo = `${movieApiBaseUrl}${movieId}?api_key=${api_key}&language=ko-KR`;

    const overviewURL = `${props.match.params.movieId}/overview`;
    
    let targetSetting = "_blank";

    useEffect(() => {
        fetchItems();     
    })
    
    const fetchItems = () => {
        if(isLoadingMovie) {
            fetch(movieInfo)
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
                    setMode("Normal");
                    setIsLoadingMovie(false);             
                })
                .catch(err => {
                    setMode("404");
                });
        }
        
        if(isLoadingCredits) {
            fetch(creditsInfo)
                .then(res => res.json())
                .then(data => {
                    for(let index = 0; index < data.cast.length; index++)
                        if(data.cast[index].profile_path !== null)
                            data.cast[index].profile_path = `${movieImageBaseUrl}original${data.cast[index].profile_path}`;
                        else
                            data.cast[index].profile_path = 'https://i.imgur.com/v2uZO3u.jpg';
            
                    console.log(data);
                    
                    setCreditsItems(data);
                    setCreditsToggle(true);
                    setIsLoadingCredits(false);
                })
                .catch(err => {
                    setMode("404");
                });
        }
    }
    
    if(movieItems.homepage === "")
        targetSetting = "_self";
    
    if(mode === "Loading") {
        return (
            <section className="inner">
                <h2>Loading...</h2>
            </section>
        );
    }
    else if(mode === "404") {
        return (
            <section className="inner">
                <h2>404 Not Found.</h2>
            </section>
        ); 
    }
    return (
        <section className="inner">
            <div>
                <div style={{width:'100%', display:'inline-block'}}>
                    <a href={movieItems.homepage} target={targetSetting}><img src={movieItems.poster_path} style={{margin:'0%', float:'left'}} alt="" width="15%" /></a>
                    <h2 style={{margin: '17% 0 0 0'}}>{movieItems.title}</h2>
                </div>
                <div id="overview">
                    <span style={{float: 'right', margin: '0 1%'}}><a href={overviewURL}>자세히보기</a></span>
                    <MovieInfo movie={movieItems}/>
                    <hr />
                    {creditsToggle &&
                        <CreditsInfo credits={creditsItems}/>
                    }
                </div>
            </div>
        </section>
    );
}

export default MovieDetailPage;