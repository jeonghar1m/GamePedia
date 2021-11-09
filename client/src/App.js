import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/Pages/LandingPage/LandingPage';
import MovieDetailPage from './components/Pages/MovieDetailPage/MovieDetailPage';
import MovieOverView from './components/Pages/MovieDetailPage/OverView/MovieOverView';
import CreditDetailPage from './components/Pages/CreditDetailPage/CreditDetailPage';
import Login from './components/Pages/MemberPage/LoginPage';
import Register from './components/Pages/MemberPage/RegisterPage';
import MyPage from './components/Pages/MemberPage/MyPage';
import SearchPage from './components/Pages/SearchPage/SearchPage';
import SearchResultsPage from './components/Pages/SearchPage/Results/SearchResults';
import {Route} from 'react-router-dom';
import Auth from './hoc/auth';
import axios from 'axios';
import Gravatar from 'react-gravatar';
import {auth} from './_actions/user_action';
import {useDispatch} from 'react-redux';
import { BsSearch } from "react-icons/bs";

function App(props) {
  const logoutHandler = () => axios.get('api/users/logout');
  const [isLogin, setisLogin] = useState(false);
  const [UserEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getIsLogin();
    getUserEmail();
  })

  const getIsLogin = () => {
    dispatch(auth()).then(res => {
      if(res.payload.isAuth)  setisLogin(true);
      else  setisLogin(false);
    })
  }

  const getUserEmail = () => {
    dispatch(auth()).then(res => {
      setUserEmail(res.payload.email);
    })
  }

  const menuRender = !isLogin ? (
    <span>
      <span className="element"><a href="/login">로그인</a></span>
      <span className="element"><a href="/register">회원가입</a></span>
    </span>
  ) : (
    <span>
      <span className="element"><a href="" onClick={logoutHandler}>로그아웃</a></span>
      <span className="element"><a href="/mypage"><Gravatar email={UserEmail} size={30} /></a></span>
    </span>
  )

  return (
    <div className="App">
    <header>
      <nav>
        <div className="inner">
          <span id="logo"><h1><a href="/">MyMovieList</a></h1></span>
          <div id="menu">
          </div>
          <div id="log">
            <a href="/search"><BsSearch /></a>
            {menuRender}
          </div>
        </div>
      </nav>
    </header>
      <Route exact path="/" component={LandingPage}></Route>
      <Route exact path="/movie/:movieId" component={MovieDetailPage}></Route>
      <Route exact path="/movie/:movieId/overview" component={MovieOverView}></Route>
      <Route exact path="/credit/:creditId" component={CreditDetailPage}></Route>
      <Route exact path="/search" component={SearchPage}></Route>
      <Route exact path="/search/:searchKeyword" component={SearchResultsPage}></Route>
      <Route exact path="/login" component={Auth(Login, false)}></Route>
      <Route exact path="/register" component={Auth(Register, false)}></Route>
      <Route exact path="/mypage" component={Auth(MyPage, true)}></Route>
    <footer>
      <hr></hr>
      &copy; 2021 MyMovieList
    </footer>
  </div>
  )
}

export default App
