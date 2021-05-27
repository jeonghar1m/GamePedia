import React, {Component} from 'react';

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

        let movieId;
    
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=ko-KR`)
            .then(res => res.json())
            .then(data => {
                let items = data.results;

                console.log(items);
            });
    }

    render () {
        return (
            <div>
                미완성.
            </div>
        )
    }
}

export default MovieDetailPage;
