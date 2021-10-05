import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/Pages/LandingPage/LandingPage';
import MovieDetailPage from './components/Pages/MovieDetailPage/MovieDetailPage';
import MovieOverView from './components/Pages/MovieDetailPage/OverView/MovieOverView';
import Login from './components/Pages/MemberPage/LoginPage';
import Register from './components/Pages/MemberPage/RegisterPage';
import {Route} from 'react-router-dom';
import Auth from './hoc/auth';
import axios from 'axios';
import {auth} from './_actions/user_action';
import {useDispatch} from 'react-redux';

function App(props) {
  const logoutHandler = () => axios.get('api/users/logout');
  const [isLogin, setisLogin] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    getIsLogin();
  })

  const getIsLogin = () => {
    dispatch(auth()).then(res => {
      if(res.payload.isAuth)  setisLogin(true);
      else  setisLogin(false);
    })
  }

  const menuRender = !isLogin ? (
    <div>
      <span className="element"><a href="/login">로그인</a></span>
      <span className="element"><a href="/register">회원가입</a></span>
    </div>
  ) : (
    <div>
      <span className="element"><a href="" onClick={logoutHandler}>로그아웃</a></span>
    </div>
  )

  return (
    <div className="App">
    <header>
      <nav>
        <div className="inner">
          <span id="logo"><h1><a href="/">MyMovieList</a></h1></span>
          <div id="log">
            {menuRender}
          </div>
        </div>
      </nav>
    </header>
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/movie/:movieId" component={MovieDetailPage}></Route>
      <Route exact path="/movie/:movieId/overview" component={MovieOverView}></Route>
      <Route exact path="/login" component={Auth(Login, false)}></Route>
      <Route exact path="/register" component={Auth(Register, false)}></Route>
    <footer>
      <hr></hr>
      &copy; 2021 MyMovieList
    </footer>
  </div>
  )
}

export default App
