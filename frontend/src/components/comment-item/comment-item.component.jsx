import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import "./comment-item.styles.scss";

import CommentReplyForm from '../comment-reply-form/comment-reply-form.component';

import { likeComment, unlikeComment } from '../../actions/posts.action';

const CommentItem = ({ comment, user, auth, likeComment, unlikeComment }) => {
    const [show, setShow] = useState(false);
    
    return (
        <Fragment>
            <div className="comment">
                <div className="comment-user">
                    <img src={`/uploads/users/${user.image}`} alt={user.firstname} className="comment-user-img"/>
                    <div className="group">
                        <div className="comment-box">
                            <span className="comment-user-name">{`${user.firstname} ${user.lastname}`}</span>
                            <span className='comment-content'>
                                {comment.content}
                            </span>
                            {
                                comment.likes.length > 0 && <span className='comment-like-count'>{comment.likes.length}</span>
                            }
                        </div>
                        <div className="comment-options">
                            {
                                comment.likes.includes(auth.user._id) ?
                                    <span className="options-small" onClick={() => unlikeComment(comment._id)}>unlike</span>
                                    :
                                    <span className="options-small" onClick={() => likeComment(comment._id)}>like</span>
                            }
                            <span className="options-small" onClick={() => setShow(!show)}>reply</span>
                            {
                                comment.user._id === auth.user._id && 
                                <Fragment>
                                    <span className="options-small">edit</span>
                                    <span className="options-small">delete</span>
                                </Fragment>
                            }
                            
                            <Moment className='posts-user-date' fromNow>{comment.date}</Moment>
                        </div>
                    </div>
                </div>
               
                <CommentReplyForm show={show} pid={comment.post} cid={comment._id} />
                {
                    !comment.replies ? <div> Loading... </div> :
                    comment.replies.map(reply =>
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
                                            {
                                                reply.likes.length > 0 && <span className='comment-like-count'>{comment.likes.length}</span>
                                            }
                                        </div>
                                        <div className="comment-options">
                                            {
                                                reply.likes.includes(auth.user._id) ?
                                                    <span className="options-small" onClick={() => unlikeComment(comment._id)}>unlike</span>
                                                    :
                                                    <span className="options-small" onClick={() => likeComment(comment._id)}>like</span>
                                            }
                                            {
                                                reply.user._id === auth.user._id && 
                                                <Fragment>
                                                    <span className="options-small">edit</span>
                                                    <span className="options-small">delete</span>
                                                </Fragment>
                                            }
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

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { likeComment, unlikeComment })(CommentItem);
