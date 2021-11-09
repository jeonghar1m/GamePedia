import React, { useEffect, useState } from 'react';
import { siteTitle, movieImageBaseUrl, api_key } from '../../../Config';
import { withRouter } from 'react-router-dom';

function SearchResults(props) {
    const [Items, setItems] = useState([]);
    const [Mode, setMode] = useState("Loading");

    const searchKeyword = props.match.params.searchKeyword;

    const fetchItems = () => {
        const searchTo = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=ko-KR&query=${searchKeyword}`;

        fetch(searchTo)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setItems(res.results);

            for(let index = 0; index < res.results.length; index++) {
                res.results[index].poster_path = `${movieImageBaseUrl}original${res.results[index].poster_path}`;
                res.results[index].id = `/movie/${res.results[index].id}`;
            }
            setMode("Normal");
        })
        .catch(err => {
            setMode("404");
        });
    }
    
    useEffect(() => {
        fetchItems();
        document.title = `${searchKeyword}에 대한 검색 결과 - ${siteTitle}`;
    }, [])

    if(Mode === "Loading") {
        return (
            <section className="inner">
                <div>
                    <h2>Loading...</h2>
                </div>
            </section>
        )
    }
    return (
        <div>
            <section className="inner">
                <div className="container">
                    <div className="row">
                        <h2>검색 결과</h2>
                        {Items.map(item => (
                            <div className="col col-xl-3 col-md-6 col-12" key={item.title}>
                                <div><a href={item.id}><img src={item.poster_path} width="100%" height="320px" alt={item.title}></img></a></div>
                                <div className="movie_name">{item.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default withRouter(SearchResults);
