import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './reply-item.styles.scss';

import Moment from 'react-moment';

import { updateReplyLike, deleteReply } from '../../actions/posts.action';

const ReplyItem = ({ reply, comment, auth, updateReplyLike, deleteReply }) => {
    return (
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
                            reply.likes.length > 0 && <span className='comment-like-count'>{reply.likes.length}</span>
                        }
                    </div>
                    <div className="comment-options">
                        {
                            reply.likes.includes(auth.user._id) ?
                                <span className="options-small" onClick={() => updateReplyLike(comment._id, reply._id)}>unlike</span>
                                :
                                <span className="options-small" onClick={() => updateReplyLike(comment._id, reply._id)}>like</span>
                        }
                        {
                            reply.user._id === auth.user._id && 
                            <Fragment>
                                <span className="options-small" onClick={() => deleteReply(comment._id, reply._id, comment.post)}>delete</span>
                            </Fragment>
                        }
                        <Moment className='posts-user-date' fromNow>{reply.date}</Moment>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { updateReplyLike, deleteReply })(ReplyItem);
