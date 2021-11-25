import React, { useEffect } from 'react';
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
import NavBar from './components/Pages/NavBar/NavBar';
import {Route} from 'react-router-dom';
import Auth from './hoc/auth';
import { auth } from './_actions/user_action';
import { useDispatch } from 'react-redux';

function App(props) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(auth());
  }, [])

  return (
    <div className="App">
    <header>
      <NavBar />
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
