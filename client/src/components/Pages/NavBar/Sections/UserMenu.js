import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Gravatar from 'react-gravatar';

function UserMenu() {
    const user = useSelector(state => state.user);
    const logoutHandler = () => {
        axios.get('api/users/logout');
        window.localStorage.clear();
    }
    if(user.userData && !user.userData.isAuth) {
        return (
            <span>
                <span className="element"><a href="/login">로그인</a></span>
                <span className="element"><a href="/register">회원가입</a></span>
            </span>
        )
    } else if(user.userData && user.userData.isAuth) {
        return (
            <span>
                <span className="element"><a href="" onClick={logoutHandler}>로그아웃</a></span>
                <span className="element"><a href="/mypage"><Gravatar email={user.userData.email} size={30} /></a></span>
            </span>
        )
    }
    return (
        <>
            
        </>
    )
}

export default UserMenu