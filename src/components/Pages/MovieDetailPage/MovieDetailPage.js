import React, {Component} from 'react';
import MovieInfo from './Sections/MovieInfo';

class MovieDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;

        const movieId = this.props.match.params.movieId;

        const creditsInfo = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`;
        const movieInfo = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=ko-KR`;
    
        fetch(movieInfo)
            .then(res => res.json())
            .then(data => {
                data.poster_path = `http://image.tmdb.org/t/p/original${data.poster_path}`;

                // 언어 data값 문자열 한국어로 번역
                for(let index = 0; index < data.spoken_languages.length; index++) {
                    if(data.spoken_languages[index].name === "English") {
                        data.spoken_languages[index].name = "영어";
                    }
                    else if(data.spoken_languages[index].name === "한국어/조선말") {
                        data.spoken_languages[index].name = "한국어";
                    }
                    else if(data.spoken_languages[index].name === "Deutsch") {
                        data.spoken_languages[index].name = "독일어";
                    }
                    else if(data.spoken_languages[index].name === "Español") {
                        data.spoken_languages[index].name = "스페인어";
                    }
                    else if(data.spoken_languages[index].name === "日本語") {
                        data.spoken_languages[index].name = "일본어";
                    }
                    else if(data.spoken_languages[index].name === "普通话") {
                        data.spoken_languages[index].name = "표준 중국어";
                    }
                    else if(data.spoken_languages[index].name === "Français") {
                        data.spoken_languages[index].name = "불어";
                    }
                    else if(data.spoken_languages[index].name === "Nederlands") {
                        data.spoken_languages[index].name = "네덜란드어";
                    }
                }
                
                console.log(data);

                this.setState({
                    items: data,
                    isLoaded: true
                })
            });
    }

    render () {
        let {isLoaded, items} = this.state;

        if(!isLoaded) {
            return (
                <section className="inner">
                    <h2>Loading...</h2>
                </section>
            );
        }
        return (
            <section class="inner">
                <div>
                    <MovieInfo movie={items}/>
                </div>
            </section>
        );
    }
}

export default MovieDetailPage;