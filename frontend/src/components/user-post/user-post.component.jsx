import React from 'react';
import { Link } from 'react-router-dom';

import CommentItem from '../../components/comment-item/comment-item.component';
import CommentForm from '../../components/comment-form/comment-form.component';
import PostForm from '../../components/post-form/post-form.component';

const UserPost = () => {
    return (
        <div>
            <PostForm />
            <div className='post'>
                <div className="post-user">
                    <img src="/me.jpg" alt="user temp" className="post-user-img"/>
                    <div className="group">
                        <span className="post-user-name">Alluysios Arriba</span>
                        <span className="post-user-date">Posted: January 20, 2020</span>
                    </div>
                    <div className="post-owner">
                        <span className="btn btn-edit">Edit</span>
                        <span className="btn btn-delete">Delete</span>
                    </div>
                </div>

                <div className="post-container">
                    <div className="post-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quo blanditiis consectetur atque id ad, sed beatae perferendis consequuntur at voluptate unde alias nisi ea ut nobis a! Eveniet, inventore.
                        <span className="post-date">January 19, 1997</span>
                    </div>

                    <div className="post-img-box">
                        <Link to="!#" className='post-image-link'>
                            <img src="/bg.jpg" alt="post img" className="post-img"/>
                        </Link>
                    </div>
                    <div className="post-options">
                        <span className="post-options-like">Like</span>
                        <span className="post-options-comment">Comment</span>
                    </div>
                </div>
                <div className="post-comment-container">
                    <span className='post-like-count'>Likes: 23</span>
                    <CommentItem />
                    <CommentForm />
                </div>
                
            </div>
        </div>
    )
}

export default UserPost;