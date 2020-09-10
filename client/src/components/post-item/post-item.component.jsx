import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './post-item.styles.scss';

import CommentItem from '../comment-item/comment-item.component';
import CommentForm from '../comment-form/comment-form.component';

import { updatePostLike, deletePost } from '../../actions/posts.action';

const PostItem = ({ post, comments, updatePostLike, deletePost, auth }) => {
    const { user } = post;
    
    return (
        <div className='posts'>
            <div className='posts-user'>
                <img src={`/uploads/users/${user.image}`} alt={user.firstname} className='posts-user-img'/>
                <div className='group'>
                    <span className='posts-user-name'>{`${user.firstname} ${user.lastname}`}</span>
                    <Moment className='posts-user-date' fromNow>{post.date}</Moment>
                </div>
                <div className='posts-owner'>
                    {
                        post.user._id === auth.user._id && <Fragment>
                            <span className='btn btn-delete' onClick={() => deletePost(post._id)}>Delete</span>
                        </Fragment>
                    }
                </div>
            </div>
            
            <div className='posts-container'>
                <div className='posts-content'>
                    {post.content}
                </div>

                <div className='posts-img-box'>
                    <Link to={`/post/${post._id}`} className='posts-image-link'>
                        {
                            post.images.length > 0 ? post.images.map(image => 
                                <img src={`/uploads/posts/${image}`} alt={`${post.content}`} className='posts-img' key={post._id} />
                            ) 
                            :
                            <Fragment></Fragment>
                        }
                    </Link>
                </div>
                <span className='posts-like-count'>Likes: {post.likes.length}</span>
                <div className='posts-options'>
                    {
                        post.likes.includes(auth.user._id) ? 
                        <span className='posts-options-like' onClick={() => updatePostLike(post._id)}>Unlike</span>
                        :
                        <span className='posts-options-like' onClick={() => updatePostLike(post._id)}>Like</span>
                    }
                    <span className='posts-options-comment'>Comment</span>
                </div>
            </div>
            <div className='posts-comment-container'>
                {
                    !comments ? <div> Loading... </div>
                    :
                    comments.filter(comment => comment.post === post._id).map(comment =>
                        <Fragment key={comment._id}>
                            <CommentItem comment={comment} user={comment.user} replies={comment.replies} />
                        </Fragment>
                    )
                }
                <CommentForm pid={post._id} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { updatePostLike, deletePost })(PostItem);
