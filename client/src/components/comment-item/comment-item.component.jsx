import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import "./comment-item.styles.scss";

import ReplyForm from '../reply-form/reply-form.component.jsx';
import ReplyItem from '../reply-item/reply-item.component.jsx';

import { updateCommentLike, updateReplyLike, deleteComment, deleteReply } from '../../actions/posts.action';

const CommentItem = ({ comment, user, auth, updateCommentLike, updateReplyLike, deleteComment, deleteReply }) => {
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
                                    <span className="options-small" onClick={() => updateCommentLike(comment._id)}>unlike</span>
                                    :
                                    <span className="options-small" onClick={() => updateCommentLike(comment._id)}>like</span>
                            }
                            <span className="options-small" onClick={() => setShow(!show)}>reply</span>
                            {
                                comment.user._id === auth.user._id && 
                                <Fragment>
                                    <span className="options-small" onClick={() => deleteComment(comment.post, comment._id)}>delete</span>
                                </Fragment>
                            }
                            
                            <Moment className='posts-user-date' fromNow>{comment.date}</Moment>
                        </div>
                    </div>
                </div>
               
                <ReplyForm show={show} pid={comment.post} cid={comment._id} />
                {   
                    !comment.replies ? <div> Loading... </div> :
                    comment.replies.map(reply =>
                        <Fragment key={reply._id}>
                            <ReplyItem comment={comment} reply={reply} />
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

export default connect(mapStateToProps, { updateCommentLike, updateReplyLike, deleteComment, deleteReply })(CommentItem);
