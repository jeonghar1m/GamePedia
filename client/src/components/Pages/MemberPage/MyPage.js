import React, { useEffect, useState } from 'react';
import { siteTitle } from '../../Config';
import { withRouter } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import Favorite from './Sections/Favorite';

function MyPage() {
    useEffect(() => {
        document.title=`${window.localStorage.getItem('userNickname')}님의 마이페이지 - ${siteTitle}`;
    }, [])

    return (
        <div>
            <section className="inner center">
                <div><Gravatar email={window.localStorage.getItem('userEmail')} size={100} /><h1>{window.localStorage.getItem('userNickname')}</h1></div>
                <Favorite />
            </section>
        </div>
    )
}

export default withRouter(MyPage)
