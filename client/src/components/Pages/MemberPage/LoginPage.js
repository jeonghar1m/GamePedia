import React, {useEffect, useState} from 'react';
import {siteTitle} from '../../Config';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './MemberPage.css';

function LoginPage() {
    useEffect(() => {
        document.title=`로그인 - ${siteTitle}`;
    }, [])

    const dispatch = useDispatch();

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();        

        let body = {
            id: Id,
            password: Password
        }

        dispatch(loginUser(body))
            .then(res => {
                if(res.payload.loginSuccess) {
                    window.localStorage.setItem('userId', res.payload.userId);
                    window.localStorage.setItem('userNickname', res.payload.userNickname);
                    window.localStorage.setItem('userEmail', res.payload.userEmail);
                    window.location.replace('/');
                } else    alert('ID 혹은 비밀번호가 맞지 않습니다.');
            })
    }

    return (
      <div>
        <section id="member-page">
          <div id="main-content" style={{margin: '14% 0'}}>
            <div id="content-name">로그인</div>
            <form method="post" onSubmit={onSubmitHandler}>
              <div className="input-area">
                <div className="element label">
                  <label htmlFor="Id_field">ID</label>
                </div>
                <div className="element">
                  <input
                    type="text"
                    value={Id}
                    onChange={onIdHandler}
                    name="id"
                    id="Id_field"
                    required
                  ></input>
                </div>
              </div>
              <div className="input-area">
                <div className="element label">
                  <label htmlFor="password_field">비밀번호</label>
                </div>
                <div className="element">
                  <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                    name="password"
                    id="password_field"
                    required
                  ></input>
                </div>
              </div>
              <div id="button-area">
                <span>
                  <button className="login" type="submit">
                    로그인
                  </button>
                </span>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
}

export default withRouter(LoginPage)
