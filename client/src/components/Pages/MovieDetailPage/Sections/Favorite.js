import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.poster_path;
    const movieRuntime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    const { isLogin } = props;
    
    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRuntime: movieRuntime
    }
    
    const buttonStyles = {
        color: Favorited ? 'white' : 'black',
        backgroundColor: Favorited ? 'green' : 'white'
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                if(res.data.success) {
                    setFavoriteNumber(res.data.favoriteNumber);
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.');
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(res => {
                if(res.data.success) {
                    setFavorited(res.data.favorited);
                } else {
                    alert('정보를 가져오는데 실패 했습니다.');
                }
            })
    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Favorite 리스트에서 지우는 것을 실패했습니다.');
                    }
                })
        } else {
            axios.post('/api/favorite/addToFavorite', variables)
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Favorite 리스트에 추가하는 것을 실패했습니다.');
                    }
                })
        }
    }

    return (
        <>
            {isLogin && 
                <div style={{marginTop: '3%', textAlign: 'center'}}>
                    <Button onClick={onClickFavorite} style={buttonStyles} type="seconday">좋아요 {FavoriteNumber}</Button>
                </div>
            }
        </>
    )
}

export default Favorite
