import React, {Component} from 'react';

class MovieOverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieItems: [],
            mode: "Loading"
        }
    }

    async componentDidMount() {
        const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;

        const movieId = this.props.match.params.movieId;
    
        const movieLang = {"English": "영어", "Korean": "한국어", "German": "독일어", "Spanish": "스페인어", "Japanese": "일본어", "Mandarin": "표준 중국어", "French": "불어", "Dutch": "네덜란드어", "Turkish": "터키어", "Finnish": "핀란드어", "Swedish": "스웨덴어", "Russian": "러시아어"};
        const countriesLang = {"US": "미국", "KR": "대한민국", "JP": "일본", "BE": "벨기에", "NL": "네덜란드", "CN": "중국", "TW": "대만", "GB": "영국", "RU": "러시아", "ZA": "남아프리카공화국", "CA": "캐나다"};

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=ko-KR`)
            .then(res => res.json())
            .then(data => {
                data.poster_path = `http://image.tmdb.org/t/p/original${data.poster_path}`;

                document.title = `${data.title} - 마이무비리스트`;  // change the title

                // 언어 data값 문자열 한국어로 번역
                for(let index = 0; index < data.spoken_languages.length; index++)
                    data.spoken_languages[index].name = movieLang[data.spoken_languages[index].english_name];
                
                for(let index = 0; index < data.production_countries.length; index++)
                    data.production_countries[index].name = countriesLang[data.production_countries[index].iso_3166_1];
                
                console.log(data);

                this.setState({
                    movieItems: data,
                    mode: "Normal"
                })
            })
            .catch(err => {
                this.setState({
                    mode: "404"
                })
            });
    }

    render () {
        const {movieItems, mode} = this.state;

        const release_date = new Date(movieItems.release_date); // 개봉연도만 가져오기 위한 상수 선언

        const preURL = `../${this.props.match.params.movieId}`;

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
                    <p><a href={preURL}>[이전]</a></p>
                    <h2><p>영화 정보</p></h2>
                    <div id="overview">
                        <b>원제</b> {movieItems.original_title}
                        <hr />
                        <b>개봉연도</b> {release_date.getFullYear()}년
                        <hr />
                        <b>국가</b> {movieItems.production_countries.map((countries, index) => (<span key={countries.name}>{countries.name}{(index < movieItems.production_countries.length - 1) ? ',\u00A0' : ''}</span>))}
                        <hr />
                        <b>장르</b> {movieItems.genres.map((genres, index) => (<span key={genres.name}>{genres.name}{(index < movieItems.genres.length - 1) ? ',\u00A0' : ''}</span>))}
                        <hr />
                        <b>상영시간</b> {movieItems.runtime}분
                        <hr />
                        <b>상영언어</b> {movieItems.spoken_languages.map((lang, index) => (<span key={lang.name}>{lang.name}{(index < movieItems.spoken_languages.length -1)? ',\u00A0' : ''}</span>))}
                        <hr />
                        <b>IMDB 평점</b> {movieItems.vote_average}
                        <hr />
                        <b>내용</b><br />
                        {movieItems.overview}
                    </div>
                </div>
            </section>
        );
    }
}

export default MovieOverView;