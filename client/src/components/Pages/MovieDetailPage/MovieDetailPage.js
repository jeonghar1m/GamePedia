import React, {useEffect, useState} from 'react';
import MovieInfo from './Sections/MovieInfo';
import CreditsInfo from './Sections/CreditsInfo';
import Comment from './Sections/Comment';
import { siteTitle, movieLang, countriesLang, movieApiBaseUrl, movieImageBaseUrl, api_key } from '../../Config';
import axios from 'axios';

function MovieDetailPage(props) {
    const [movieItems, setMovieItems] = useState([]);
    const [creditsItems, setCreditsItems] = useState([]);
    const [directorsItems, setDirectorsItems] = useState([]);
    const [trailerItem, setTrailerItem] = useState("");
    const [creditsToggle, setCreditsToggle] = useState(false);
    const [isLoadingMovie, setIsLoadingMovie] = useState(true);
    const [isLoadingCredits, setIsLoadingCredits] = useState(true);
    const [isLoadingTrailer, setIsLoadingTrailer] = useState(true);
    const [isTrailerExist, setIsTrailerExist] = useState(true);
    const [mode, setMode] = useState("Loading");
    const [Comments, setComments] = useState([]);
        
    const movieId = props.match.params.movieId;
    const variable = {movieId: movieId};
    
    const creditsInfo = `${movieApiBaseUrl}${movieId}/credits?api_key=${api_key}`;
    const movieInfo = `${movieApiBaseUrl}${movieId}?api_key=${api_key}&language=ko-KR`;
    const trailerInfo = `${movieApiBaseUrl}${movieId}/videos?api_key=${api_key}&language=ko-KR`;

    const overviewURL = `${props.match.params.movieId}/overview`;

    useEffect(() => {
        fetchItems();

        axios.post('/api/comment/getComment', variable)
        .then(res => {
            if(res.data.success) {
                setComments(res.data.comments);
            } else {
                alert('코멘트 정보를 가져오는데 실패했습니다.');
            }
        })
    }, []);

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment));
    }
    
    const fetchItems = async () => {
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
                            data.cast[index].profile_path = '/img/profile_image_unknown.jpg';

                    const director = data.crew.filter(crew => (crew.job === "Director"));

                    for(let index = 0; index < director.length; index++)
                        if(director[index].profile_path !== null)
                            director[index].profile_path = `${movieImageBaseUrl}original${director[index].profile_path}`
                        else
                            director[index].profile_path = '/img/profile_image_unknown.jpg';
                    
                    setCreditsItems(data);
                    setDirectorsItems(director);
                    setCreditsToggle(true);
                    setIsLoadingCredits(false);
                })
                .catch(err => {
                    setMode("404");
                });
        }

        if(isLoadingTrailer) {
            fetch(trailerInfo)
                .then(res => res.json())
                .then(data => setTrailerItem(`https://www.youtube.com/embed/${data.results[0].key}`))
                .catch(err => setIsTrailerExist(false))
        }
    }

    const movieWebsiteLinkRender = movieItems.homepage !== "" ? (
        <a href={movieItems.homepage} target="_blank"><img src={movieItems.poster_path} style={{margin:'0%', float:'left'}} alt="" width="15%" /></a>
    ) : (
        <img src={movieItems.poster_path} style={{margin:'0%', float:'left'}} alt="" width="15%" />
    )
    
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
                    {movieWebsiteLinkRender}
                    <h2 style={{margin: '17% 0 0 0'}}>{movieItems.title}</h2>
                </div>
                {/* Trailer */}
                {isTrailerExist &&
                    <div>
                        <iframe width="560" height="315" src={trailerItem} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                }
                {/* Trailer End */}
                <div id="overview">
                    <span style={{float: 'right', margin: '0 1%'}}><a href={overviewURL}>자세히보기</a></span>
                    <MovieInfo movie={movieItems}/>
                    <hr />
                    {creditsToggle &&
                        <CreditsInfo credits={creditsItems} director={directorsItems} />
                    }
                </div>
                {/* Comments */}
                <Comment refreshFunction={refreshFunction} commentLists={Comments} movieId={movieId} />
            </div>
        </section>
    );
}

export default MovieDetailPage;