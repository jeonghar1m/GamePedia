import React, {Component} from 'react';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    async componentDidMount() {
        const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;
        let movies = [];

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=ko-KR`)
            .then(res => res.json())
            .then(data => {
                let items = data.results;
                //let jsonParam = Object.keys(items[0]);

                for(let index = 0; index < items.length; index++) {
                    movies[index] = items[index];
                    movies[index].backdrop_path = `http://image.tmdb.org/t/p/original${items[index].backdrop_path}`;
                    movies[index].poster_path = `http://image.tmdb.org/t/p/original${items[index].poster_path}`;
                    movies[index].id = `/movie/${items[index].id}`;
                }

                this.setState({
                    items: movies,
                    isLoaded: true
                })
                console.log(movies);
            });
    }

    render() {
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
                <h2>영화 TOP 20</h2>
                <div class="container">
                    <div class="row">
                        {items.map(item => (
                            <div class="col col-xl-3 col-md-6 col-12"><a href={item.id}><img src={item.poster_path} width="100%" height="95%" alt=""></img></a></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

}

export default MainPage;