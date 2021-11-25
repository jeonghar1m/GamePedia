import React, { useEffect, useState } from 'react';
import { siteTitle } from '../../Config';
import { withRouter } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import Favorite from './Sections/Favorite';
import { useSelector } from 'react-redux';

function MyPage() {
    const user = useSelector(state => state.user);
    useEffect(() => {
        document.title=`마이페이지 - ${siteTitle}`;
    }, [])
    if(user.userData) {
        return (
            <div>
                <section className="inner center">
                    <div><Gravatar email={user.userData.email} size={100} /><h1>{user.userData.nickname}</h1></div>
                    <Favorite />
                </section>
            </div>
        )
    }
    return (
        <div>
            Loading...
        </div>
    )
}

export default withRouter(MyPage)
