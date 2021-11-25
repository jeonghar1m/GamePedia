import React from 'react';
import UserMenu from './Sections/UserMenu';
import { BsSearch } from "react-icons/bs";

function NavBar() {
    return (
        <nav>
            <div className="inner">
            <span id="logo"><h1><a href="/">MyMovieList</a></h1></span>
            <div id="menu">
            </div>
            <div id="log">
                <a href="/search"><BsSearch /></a>
                <UserMenu />
            </div>
            </div>
        </nav>
    )
}

export default NavBar
