import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import './profile.styles.scss';

import PostForm from '../../components/post-form/post-form.component';
import PostItem from '../../components/post-item/post-item.component';
// Actions
import { getAllPosts } from '../../actions/posts.action';

const Profile = ({ getAllPosts, posts: { posts, comments }, auth: { user } }) => {
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts])
    
    const userPosts = posts.filter(post => post.user._id === user._id);

    return (
        <Fragment>
            <div className='profile'>
                <div className="profile-user">
                    <img src={`/uploads/users/${user.image}`} alt="profile img" className='profile-user-img' />
                    <h3 className='profile-user-name'>{`${user.firstname} ${user.lastname}`}</h3>
                    <p className='profile-user-bio'>{user.bio}</p>
                    <hr className="divider"/>
                </div>

                <div className="profile-about">
                    <h4 className='profile-about-heading'>About me</h4>
                    <div className='profile-about-item'>Joined: {user.date}</div>
                    <div className='profile-about-item'>Status: {user.status}</div>
                    <div className='profile-about-item'>Hobby: {user.hobby.join(',')}</div>
                </div>
                <div className="profile-posts">
                    <PostForm />
                    {
                        !userPosts ? <div> Loading... </div>
                        :
                        userPosts.map(post =>
                            <Fragment key={post._id}>
                                <PostItem post={post} comments={comments} />
                            </Fragment>
                        )
                    }
                    <hr className='divider'></hr>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    posts: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getAllPosts })(Profile);
