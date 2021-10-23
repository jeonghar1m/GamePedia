import React, {useEffect, useState} from 'react';
import {siteTitle} from '../../Config';
import { withRouter } from 'react-router-dom';
import {auth} from '../../../_actions/user_action';
import {useDispatch} from 'react-redux';

function MyPage() {
    useEffect(() => {
        dispatch(auth()).then(res => {
            setNickname(res.payload.nickname);
            document.title=`${res.payload.nickname}님의 마이페이지 - ${siteTitle}`;
        });
    }, [])

    const dispatch = useDispatch();
    const [Nickname, setNickname] = useState("");

    return (
        <div>
            <section className="inner">
                <div><img src="/img/user_profile.png" /><h1>{Nickname}</h1></div>
            </section>
        </div>
    )
}

export default withRouter(MyPage)
