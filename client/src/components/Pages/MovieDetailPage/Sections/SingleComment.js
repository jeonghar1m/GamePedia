import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

function SingleComment(props) {
    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const onClickReplyOpen = (event) => {
        event.preventDefault();
        setOpenReply(!OpenReply);
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            movieId: props.movieId,
            responseTo: props.comment._id
        }

        axios.post('/api/comment/saveComment', variables)
        .then(res => {
            if(res.data.success) {
                setCommentValue("");
                setOpenReply(!OpenReply);
                props.refreshFunction(res.data.result);
            } else {
                alert('코멘트를 저장하지 못했습니다.');
            }
        })
    }

    let actions = [];
    if(props.isLogin) {
        actions = [
            <a href="" onClick={onClickReplyOpen} key="comment-basic-reply-to">답글 쓰기</a>
        ]
    }

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.nickname}
                avatar={<Avatar src="/img/user_profile.png" alt="image" />}
                content={<p>{props.comment.content}</p>}
            />
            {OpenReply && 
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성하세요."
                    />
                    <br />
                    <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>확인</Button>
                </form>
            }
        </div>
    )
}

export default SingleComment
