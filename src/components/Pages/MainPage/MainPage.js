import React, {Component} from 'react';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            mode: "Loading"
        }
    }

    async componentDidMount() {
        const api_key = process.env.REACT_APP_MOVIEDB_API_KEY;

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=ko-KR`)
            .then(res => res.json())
            .then(data => {
                for(let index = 0; index < data.results.length; index++) {
                    data.results[index].poster_path = `http://image.tmdb.org/t/p/original${data.results[index].poster_path}`;
                    data.results[index].id = `/movie/${data.results[index].id}`;
                }

                this.setState({
                    items: data.results,
                    mode: "Normal"
                })
                console.log(data.results);
            })
            .catch(err => {
                this.setState({
                    mode: "404"
                })
            });
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
        if(mode === "404") {
            return (
                <section className="inner">
                    <h2>404 Not Found.</h2>
                </section>
            ); 
        }
        return (
            <section className="inner">
                <h2>영화 TOP 20</h2>
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