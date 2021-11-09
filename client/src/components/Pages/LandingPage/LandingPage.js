import React, {useEffect, useState, useCallback} from 'react';
import { withRouter } from 'react-router';
import { siteTitle, movieApiBaseUrl, movieImageBaseUrl, api_key } from '../../Config';

function LandingPage() {
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState("Loading");
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(true);
 
    const fetchMovies = useCallback(() => {
        const movieInfo = `${movieApiBaseUrl}popular?api_key=${api_key}&language=ko-KR&page=${page}`;
        
        if(isFetching) {
            fetch(movieInfo)
            .then(res => res.json())
            .then(res => {
                for(let index = 0; index < res.results.length; index++) {
                    res.results[index].poster_path = `${movieImageBaseUrl}original${res.results[index].poster_path}`;
                    res.results[index].id = `/movie/${res.results[index].id}`;
                }
                
                setItems([...items, ...res.results]);
                setMode("Normal");
                setPage(res.page + 1);
                setIsFetching(false);
            })
            .catch(err => {
                setMode("404");
            });
        }
    }, [api_key, isFetching, items, page])
   
    const infiniteScroll = useCallback(() => {
        const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        const clientHeight = document.documentElement.clientHeight;
        
        if((scrollTop + clientHeight >= scrollHeight) && !isFetching)
            setIsFetching(true);
    }, [isFetching])
    
    useEffect(() => {
        document.title = siteTitle;
        if(isFetching)
            fetchMovies();
        window.addEventListener('scroll', infiniteScroll, true);

        return () => {
            window.removeEventListener('scroll', infiniteScroll, true);
        };
    }, [page, fetchMovies, infiniteScroll, isFetching])
    
    if(mode === "Loading") {
        return (
            <section className="inner">
                <div>
                    <h2>Loading...</h2>
                </div>
            </section>
        )
    }
    else if(mode === "404") {
        return (
            <section className="inner">
                <div>
                    <h2>404 Not Found</h2>
                </div>
            </section>
        )
    }
    return (
        <section className="inner">
            <div>
                <h2>영화 TOP</h2>
                <div className="container">
                    <div className="row">
                        {items.map(item => (
                            <div className="col col-xl-3 col-md-6 col-12" key={item.title}>
                                <div><a href={item.id}><img src={item.poster_path} width="100%" height="320px" alt={item.title}></img></a></div>
                                <div className="movie_name">{item.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(LandingPage);