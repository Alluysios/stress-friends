import React, { Fragment } from 'react';
import './post-item.styles.scss';

import { Link } from 'react-router-dom';

import CommentItem from '../comment-item/comment-item.component';
import CommentForm from '../comment-form/comment-form.component';

const PostItem = ({ post }) => {
    const { user } = post;

    return (
        <div className='posts'>
            <div className="posts-user">
                <img src={`/uploads/users/${user.image}`} alt={user.firstname} className="posts-user-img"/>
                <div className="group">
                    <span className="posts-user-name">{`${user.firstname} ${user.lastname}`}</span>
                    <span className="posts-user-date">Posted: {post.date} </span>
                </div>
                <div className="posts-owner">
                    <span className="btn btn-edit">Edit</span>
                    <span className="btn btn-delete">Delete</span>
                </div>
            </div>
            
            <div className="posts-container">
                <div className="posts-content">
                    {post.content}
                </div>

                <div className="posts-img-box">
                    <Link to={`/post`} className='posts-image-link'>
                        {
                            post.images.length > 0 ? post.images.map(image => 
                                <img src={`/uploads/posts/${image}`} alt={`${post.content}`} className="posts-img" key={post._id} />
                            ) 
                            :
                            <Fragment></Fragment>
                        }
                    </Link>
                </div>
                <div className="posts-options">
                    <span className="posts-options-like">Like</span>
                    <span className="posts-options-comment">Comment</span>
                </div>
            </div>
            <div className="posts-comment-container">
                <span className='posts-like-count'>Likes: {post.likes.length}</span>
                {
                    !post.comments ? <div> Loading... </div>
                    :
                    post.comments.map(comment =>
                        <Fragment key={comment._id}>
                            <CommentItem comment={comment} user={comment.user} replies={comment.replies} />
                        </Fragment>
                    )
                }
                <CommentForm />
            </div>
        </div>
    )
}

export default PostItem;
