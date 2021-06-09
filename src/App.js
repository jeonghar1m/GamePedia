import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/Pages/MainPage/MainPage';
import MovieDetailPage from './components/Pages/MovieDetailPage/MovieDetailPage';
import MovieOverView from './components/Pages/MovieDetailPage/OverView/MovieOverView';
import Login from './components/Pages/MemberPage/LoginPage';
import Register from './components/Pages/MemberPage/RegisterPage';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <div className="inner">
              <span id="logo"><h1><a href="/">MyMovieList</a></h1></span>
              <div id="log">
                <span className="element"><a href="/login">로그인</a></span>
                <span className="element"><a href="/register">회원가입</a></span>
              </div>
            </div>
          </nav>
        </header>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/movie/:movieId" component={MovieDetailPage}></Route>
        <Route exact path="/movie/:movieId/overview" component={MovieOverView}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <footer>
          <hr></hr>
          &copy; 2021 MyMovieList
        </footer>
      </div>
    );
  }
}

export default App;