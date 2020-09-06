import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import './posts.styles.scss';

import PostForm from '../post-form/post-form.component';
import PostItem from '../post-item/post-item.component';

// Actions
import { getAllPosts } from '../../actions/posts.action';

const Posts = ({ getAllPosts, posts: { posts }, auth: { user } }) => {
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts])

    return (
        <Fragment>
            <div className='flex'>
                <img src={`/uploads/users/${user.image}`} alt={user.firstname} className='user-img'/>
                <h2>{user.firstname} encourage your friends, start posting!</h2>
            </div>
            <PostForm />
            {
                !posts ? <div> Loading... </div>
                :
                posts.map(post =>
                    <Fragment key={post._id}>
                        <PostItem post={post} />
                    </Fragment>
                )
            }
            <hr className='divider'></hr>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    posts: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getAllPosts })(Posts);
