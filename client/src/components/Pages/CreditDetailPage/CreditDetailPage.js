import React, {useEffect, useState} from 'react';
import { siteTitle, jobLang, movieImageBaseUrl, api_key } from '../../Config';
import MovieInfo from './Sections/MovieInfo';

function CreditDetailPage(props) {
    const [CreditItems, setCreditItems] = useState([]);
    const [MovieItems, setMovieItems] = useState([]);
    const [mode, setMode] = useState("Loading");
    const [isLoadingCreditInfo, setisLoadingCreditInfo] = useState(true);
    const [isLoadingCreditMovieInfo, setisLoadingCreditMovieInfo] = useState(true);

    const creditId = props.match.params.creditId;
    const creditInfo = `https://api.themoviedb.org/3/person/${creditId}?api_key=${api_key}&language=ko-KR`;
    const creditMovieInfo = `https://api.themoviedb.org/3/person/${creditId}/movie_credits?api_key=${api_key}&language=ko-KR`;

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = () => {
        if(isLoadingCreditInfo) {
            fetch(creditInfo)
                .then(res => res.json())
                .then(data => {
                    data.profile_path = `${movieImageBaseUrl}original${data.profile_path}`;
                    data.known_for_department = jobLang[data.known_for_department];
                    setCreditItems(data);
                    document.title = `${data.name} - ${siteTitle}`;
                    setisLoadingCreditInfo(false);
                   // console.log(data);              
                })
                .catch(err => setMode("404"))
        }
        if(isLoadingCreditMovieInfo) {
            fetch(creditMovieInfo)
                .then(res => res.json())
                .then(data => {
                    setMovieItems(data);
                    setisLoadingCreditMovieInfo(false);
                    setMode("Normal");
                })
        }
    }

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
            <div style={{width:'100%', display:'inline-block'}}>
                <img src={CreditItems.profile_path} style={{margin:'0%', float:'left'}} alt="" width="15%" />
                <p><h2 style={{margin: '15% 0 0 0'}}>{CreditItems.name}</h2></p>
                <p><h5>{CreditItems.known_for_department}</h5></p>
            </div>
            <div id="overview">
                <MovieInfo cast={MovieItems.cast} crew={MovieItems.crew} />
            </div>
        </section>
    )
}

export default CreditDetailPage
