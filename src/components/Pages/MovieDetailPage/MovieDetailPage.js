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
    
        const movieLang = {"English": "영어", "한국어/조선말": "한국어", "Deutsch": "독일어", "Español": "스페인어", "日本語": "일본어", "普通话": "표준 중국어", "Français": "불어", "Nederlands": "네덜란드어"};

        fetch(movieInfo)
            .then(res => res.json())
            .then(data => {
                data.poster_path = `http://image.tmdb.org/t/p/original${data.poster_path}`;

                // 언어 data값 문자열 한국어로 번역
                for(let index = 0; index < data.spoken_languages.length; index++)
                    data.spoken_languages[index].name = movieLang[data.spoken_languages[index].name];
                
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