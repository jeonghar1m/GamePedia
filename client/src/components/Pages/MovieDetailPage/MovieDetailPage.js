import React, {useEffect, useState} from 'react';
import MovieInfo from './Sections/MovieInfo';
import CreditsInfo from './Sections/CreditsInfo';
import Comment from './Sections/Comment';
import TheMovieDBComment from './Sections/TheMovieDBComment';
import Favorite from './Sections/Favorite';
import { siteTitle, movieLang, countriesLang, movieApiBaseUrl, movieImageBaseUrl, api_key } from '../../Config';
import axios from 'axios';
import { Modal, Button } from 'antd';
import SimilarInfo from './Sections/SimilarInfo';
import { auth } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';

function MovieDetailPage(props) {
    const [movieItems, setMovieItems] = useState([]);
    const [similarItems, setSimilarItems] = useState([]);
    const [creditsItems, setCreditsItems] = useState([]);
    const [directorsItems, setDirectorsItems] = useState([]);
    const [trailerItem, setTrailerItem] = useState("");
    const [creditsToggle, setCreditsToggle] = useState(false);
    const [isLoadingMovie, setIsLoadingMovie] = useState(true);
    const [isLoadingCredits, setIsLoadingCredits] = useState(true);
    const [isLoadingTrailer, setIsLoadingTrailer] = useState(true);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);
    const [isTrailerExist, setIsTrailerExist] = useState(true);
    const [mode, setMode] = useState("Loading");
    const [Comments, setComments] = useState([]);
    const [TheMovieDBReviews, setTheMovieDBReviews] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
        
    const movieId = props.match.params.movieId;
    const variable = {movieId: movieId};
    
    const movieInfo = `${movieApiBaseUrl}${movieId}?api_key=${api_key}&language=ko-KR`;
    const similarInfo = `${movieApiBaseUrl}${movieId}/similar?api_key=${api_key}&language=ko-KR`;
    const creditsInfo = `${movieApiBaseUrl}${movieId}/credits?api_key=${api_key}`;
    const theMovieDBReviewsData = `${movieApiBaseUrl}${movieId}/reviews?api_key=${api_key}`;
    const trailerInfo = `${movieApiBaseUrl}${movieId}/videos?api_key=${api_key}&language=ko-KR`;

    const overviewURL = `${props.match.params.movieId}/overview`;
    
    const dispatch = useDispatch();

    useEffect(() => {
        fetchItems();
        getIsLogin();

        axios.post('/api/comment/getComment', variable)
        .then(res => {
            if(res.data.success) {
                console.log(res.data.comments);
                setComments(res.data.comments);
            } else {
                alert('코멘트 정보를 가져오는데 실패했습니다.');
            }
        })
    }, []);


    const getIsLogin = () => {
        dispatch(auth()).then(res => {
          if(res.payload.isAuth)  setIsLogin(true);
          else  setIsLogin(false);
        })
    }

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
                .catch(err => setMode("404"));
        }

        if(isLoadingSimilar) {
            fetch(similarInfo)
                .then(res => res.json())
                .then(data => {
                    setSimilarItems(data.results);
                    setIsLoadingSimilar(false);
                })
                .catch(err => setMode("404"))
        }

        if(isLoadingReviews) {
            fetch(theMovieDBReviewsData)
                .then(res => res.json())
                .then(data => {
                    setTheMovieDBReviews(data.results);
                    setIsLoadingReviews(false);
                })
                .catch(err => setMode("404"))
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
                    <>
                        <Button style={{float: 'right'}} type="seconday" onClick={() => {
                            setIsModalVisible(true);
                        }}>
                            트레일러
                        </Button>
                        <Modal title="영화 트레일러"
                            visible={isModalVisible}
                            width={600}
                            onCancel={() => {
                                setIsModalVisible(false);
                            }}
                            footer={null}
                            >
                            <iframe width="560" height="315" src={trailerItem} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </Modal>
                    </>
                }
                {/* Trailer End */}
                {/* Favorite Button */}
                <Favorite movieInfo={movieItems} movieId={movieId} userFrom={localStorage.getItem('userId')} isLogin={isLogin} />
                {/* Favorite Button End */}
                <div id="overview">
                    <span style={{float: 'right', margin: '0 1%'}}><a href={overviewURL}>자세히보기</a></span>
                    <MovieInfo movie={movieItems}/>
                    <hr />
                    {creditsToggle &&
                        <CreditsInfo credits={creditsItems} director={directorsItems} />
                    }
                    <hr />
                    {/* Similar Movie */}
                    <div style={{margin: '0 0 10% 0'}}>
                        <SimilarInfo items={similarItems} />
                    </div>
                    {/* Similar Movie End */}
                </div>
                {/* Comments */}
                {(TheMovieDBReviews.length > 0) &&
                    <p><h4>TheMovieDB 리뷰</h4></p>
                }
                {TheMovieDBReviews && TheMovieDBReviews.map(item => (
                    <TheMovieDBComment review={item} />
                ))}
                <Comment refreshFunction={refreshFunction} commentLists={Comments} movieId={movieId} isLogin={isLogin} />
            </div>
        </section>
    );
}

export default MovieDetailPage;