import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/Pages/MainPage/MainPage';
import MovieDetailPage from './components/Pages/MovieDetailPage/MovieDetailPage';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <body>
          <header>
            <nav>
              <div class="inner">
                <span id="logo"><h1><a href="/">MyMovieList</a></h1></span>
              </div>
              <hr></hr>
            </nav>
            <Route exact path="/"><MainPage></MainPage></Route>
            <Route exact path="/movie/:movieId"><MovieDetailPage></MovieDetailPage></Route>
          </header>
        </body>
      </div>
    );
  }
}

export default App;