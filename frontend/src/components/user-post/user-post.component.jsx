import React from 'react';
import { Link } from 'react-router-dom';

import CommentItem from '../../components/comment-item/comment-item.component';
import CommentForm from '../../components/comment-form/comment-form.component';
import PostForm from '../../components/post-form/post-form.component';

const UserPost = () => {
    return (
        <div>
            <PostForm />
            <div className='posts'>
                <div className="posts-user">
                    <img src="/me.jpg" alt="user temp" className="posts-user-img"/>
                    <div className="group">
                        <span className="posts-user-name">Alluysios Arriba</span>
                        <span className="posts-user-date">Postsed: January 20, 2020</span>
                    </div>
                    <div className="posts-owner">
                        <span className="btn btn-edit">Edit</span>
                        <span className="btn btn-delete">Delete</span>
                    </div>
                </div>

                <div className="posts-container">
                    <div className="posts-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quo blanditiis consectetur atque id ad, sed beatae perferendis consequuntur at voluptate unde alias nisi ea ut nobis a! Eveniet, inventore.
                        <span className="posts-date">January 19, 1997</span>
                    </div>

                    <div className="posts-img-box">
                        <Link to="!#" className='posts-image-link'>
                            <img src="/bg.jpg" alt="posts img" className="posts-img"/>
                        </Link>
                    </div>
                    <div className="posts-options">
                        <span className="posts-options-like">Like</span>
                        <span className="posts-options-comment">Comment</span>
                    </div>
                </div>
                <div className="posts-comment-container">
                    <span className='posts-like-count'>Likes: 23</span>
                    <CommentItem />
                    <CommentForm />
                </div>
                
            </div>
        </div>
    )
}

export default UserPost;