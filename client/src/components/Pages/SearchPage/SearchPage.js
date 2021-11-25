import React, { useEffect, useState } from 'react';
import { siteTitle } from '../../Config';
import { withRouter } from 'react-router-dom';
import './SearchPage.css';
import { BsSearch } from "react-icons/bs";
import { api_key } from '../../Config';

function SearchPage() {
    const [SearchValue, setSearchValue] = useState("");
    const [Items, setItems] = useState([]);
    
    const onSearchValueHandler = (event) => {
        setSearchValue(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        window.location.replace(`/search/${SearchValue}`);
    }
    
    useEffect(() => {
        const searchTo = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=ko-KR&query=${SearchValue}`;
        document.title = `영화 검색 - ${siteTitle}`;

        fetch(searchTo)
            .then(res => res.json())
            .then(res => setItems(res.results))
    }, [SearchValue])

    return (
        <div>
            <section id="search-page">
            <div id="main-content" style={{margin: '14% 0'}}>
                <div id="content-name"><BsSearch /></div>
                <form method="post" onSubmit={onSubmitHandler}>
                <div className="input-area">
                    <div className="element label">
                    </div>
                    <div className="element">
                    <input
                        type="text"
                        value={SearchValue}
                        onChange={onSearchValueHandler}
                        required
                    ></input>
                    </div>
                </div>
                <div id="button-area">
                    <span>
                    <button className="search" type="submit">
                        확인
                    </button>
                    </span>
                </div>
                <div>
                    <ul>
                        {Items && Items.map(item => (<li><a href={`/search/${item.title}`} style={{color: '#000000'}}>{item.title}</a></li>))}
                    </ul>
                </div>
                </form>
            </div>
            </section>
        </div>
    )
}

export default withRouter(SearchPage);