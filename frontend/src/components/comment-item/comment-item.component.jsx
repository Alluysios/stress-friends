import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import "./comment-item.styles.scss";

import CommentReplyForm from '../comment-reply-form/comment-reply-form.component';

const CommentItem = ({ comment, user, replies }) => {
    const [show, setShow] = useState(false);

    return (
        <Fragment>
            <div className="comment">
                <div className="comment-user">
                    <img src={`/uploads/users/${user.image}`} alt="post comment temp" className="comment-user-img"/>
                    <div className="group">
                        <div className="comment-box">
                            <span className="comment-user-name">{`${user.firstname} ${user.lastname}`}</span>
                            <span className='comment-content'>
                                {comment.content}
                            </span>
                        </div>
                        <div className="comment-options">
                            <span className="options-small">like</span>
                            <span className="options-small" onClick={() => setShow(!show)}>reply</span>
                            <span className="options-small">edit</span>
                            <span className="options-small">delete</span>
                            <Moment className='posts-user-date' fromNow>{comment.date}</Moment>
                        </div>
                    </div>
                </div>
               
                <CommentReplyForm show={show} />
                {
                    !replies ? <div> Loading... </div>
                    :
                    replies.map(reply =>
                        <Fragment key={reply._id}>
                            <div className="comment-reply">
                                <div className="comment-user">
                                    <img src={`/uploads/users/${reply.user.image}`} alt={reply.user.firstname} className="comment-reply-user"/>
                                    <div className="group">
                                        <div className="comment-box">
                                            <span className="comment-reply-name">{`${reply.user.firstname} ${reply.user.lastname}`}</span>
                                            <span className='comment-content'>
                                                {reply.content}
                                            </span>
                                        </div>
                                        <div className="comment-options">
                                            <span className="options-small">like</span>
                                            <span className="options-small">edit</span>
                                            <span className="options-small">delete</span>
                                            <Moment className='posts-user-date' fromNow>{reply.date}</Moment>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    )
}

export default CommentItem;
