import React, { useState } from 'react';
import { Comment, Avatar } from 'antd';
import 'antd/dist/antd.css';

function TheMovieDBComment(props) {
    const { review } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isSeeMoreButtonActivate, setIsSeeMoreButtonActivate] = useState([]);
    
    const seeMoreReview = (event) => {
        event.preventDefault();
        setIsSeeMoreButtonActivate(false);
    }

    const foldReview = (event) => {
        event.preventDefault();
        setIsSeeMoreButtonActivate(true);
    }
    
    const seeMore=[
        <a href="" onClick={seeMoreReview}>[더 보기]</a>
    ];
    const fold=[
        <a href="" onClick={foldReview}>[접기]</a>
    ];

    return (
        <div>
            <Comment
                actions={isSeeMoreButtonActivate ? seeMore : fold}
                author={review.author}
                avatar={<Avatar src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`} alt="image" />}
                content={isSeeMoreButtonActivate ? <p>{review.content.slice(0, 100)}</p> : review.content}
            />
        </div>
    )
}

export default TheMovieDBComment
