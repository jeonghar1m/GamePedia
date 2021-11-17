import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map(comment => {
            if(comment.responseTo === props.parantCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber);
    }, [props.commentLists, props.parantCommentId])

    const renderReplyComment = (parantCommentId) => 
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parantCommentId && 
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} movieId={props.movieId} isLogin={props.isLogin} />
                        <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} movieId={props.movieId} isLogin={props.isLogin} parantCommentId={comment._id} />
                    </div>
                }
            </React.Fragment>
        ))

    const onHandleChange = (event) => {
        event.preventDefault();
        setOpenReplyComments(!OpenReplyComments);
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <a href="" style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>{ChildCommentNumber}개의 댓글 더보기</a>
            }
            {OpenReplyComments &&
                renderReplyComment(props.parantCommentId)
            }
        </div>
    )
}

export default ReplyComment
