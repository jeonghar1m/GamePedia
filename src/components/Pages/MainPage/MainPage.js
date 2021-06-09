import React, {Component} from 'react';
import {siteTitle, movieApiBaseUrl, movieImageBaseUrl} from '../../Config';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            mode: "Loading",
            page: 1
        }
        this.infiniteScroll = this.infiniteScroll.bind(this);
    }

    infiniteScroll() {
        const {page} = this.state;
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        if(scrollTop + clientHeight >= scrollHeight) {
            this.setState({
                page: page + 1
            })
            this.fetchMovies();
        }
    }

    async componentDidMount() {
        document.title = siteTitle;  // change the title

        this.fetchMovies();

        window.addEventListener('scroll', this.infiniteScroll, true);
    }

    async componentWillUnmount() {
        window.removeEventListener('scroll', this.infiniteScroll, true);
    }

    fetchMovies() {
        const {page, items} = this.state;
        const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;
        const movieInfo = `${movieApiBaseUrl}popular?api_key=${api_key}&language=ko-KR&page=${page}`;

        fetch(movieInfo)
            .then(res => res.json())
            .then(data => {
                for(let index = 0; index < data.results.length; index++) {
                    data.results[index].poster_path = `${movieImageBaseUrl}original${data.results[index].poster_path}`;
                    data.results[index].id = `/movie/${data.results[index].id}`;
                }

                this.setState({
                    items: [...items, ...data.results],
                    mode: "Normal",
                    page: data.page
                })
                console.log(data);
            })
            .catch(err => {
                this.setState({
                    mode: "404"
                })
            });
    }

    loadMoreMovies(page) {
        const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;
        const movieInfo = `${movieApiBaseUrl}popular?api_key=${api_key}&language=ko-KR&page=${page + 1}`;

        this.fetchMovies(movieInfo);
    }

    render() {
        const {mode, items} = this.state;

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
                <h2>영화 TOP</h2>
                <div className="container">
                    <div className="row">
                        {items.map(item => (
                            <div className="col col-xl-3 col-md-6 col-12" key={item.title}><a href={item.id}><img src={item.poster_path} width="100%" height="95%" alt={item.title}></img></a></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

}

export default MainPage;