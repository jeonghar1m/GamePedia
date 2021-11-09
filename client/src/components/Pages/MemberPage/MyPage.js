import React, {useEffect, useState} from 'react';
import {siteTitle} from '../../Config';
import { withRouter } from 'react-router-dom';
import {auth} from '../../../_actions/user_action';
import {useDispatch} from 'react-redux';
import Gravatar from 'react-gravatar';

function MyPage() {
    useEffect(() => {
        dispatch(auth()).then(res => {
            setNickname(res.payload.nickname);
            setEmail(res.payload.email);
            document.title=`${res.payload.nickname}님의 마이페이지 - ${siteTitle}`;
        });
    }, [])

    const dispatch = useDispatch();
    const [Nickname, setNickname] = useState("");
    const [Email, setEmail] = useState("");

    return (
        <div>
            <section className="inner center">
                <div><Gravatar email={Email} size={100} /><h1>{Nickname}</h1></div>
            </section>
        </div>
    )
}

export default withRouter(MyPage)
