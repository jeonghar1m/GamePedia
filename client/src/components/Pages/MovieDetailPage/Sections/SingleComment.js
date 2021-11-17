import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import Gravatar from 'react-gravatar';

function SingleComment(props) {
    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const { movieId } = props;
    const timestamp = new Date().getTime();

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
            responseTo: props.comment._id,
            commentId: `${movieId}+${timestamp}`
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

    const onClickRemoveComment = (event) => {
        event.preventDefault();

        const variables = {
            commentId: props.comment.commentId
        }

        if(window.confirm("코멘트를 삭제할까요?")) {
            axios.post('/api/comment/removeComment', variables)
                .then(res => {
                    if(res.data.success) {
                        alert('코멘트를 삭제했습니다.');
                        window.location.replace('');
                    } else {
                        alert('코멘트를 삭제하지 못했습니다.')
                    }
                })
        } else {
            alert("취소합니다.");
        }
    }

    let actions = [];
    if(props.isLogin) {
        actions = [
            <a href="" onClick={onClickReplyOpen} key="comment-basic-reply-to">[답글 쓰기]</a>
        ]
        if(user.userData._id === props.comment.writer._id) {
            actions = [
                <div>
                <a href="" onClick={onClickReplyOpen} key="comment-basic-reply-to">[답글 쓰기]</a> <a href="" onClick={onClickRemoveComment} key="comment-delete">[댓글 삭제]</a>
                </div>
            ]
        }
    }

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.nickname}
                avatar={<Gravatar email={props.comment.writer.email} size={100} />}
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
