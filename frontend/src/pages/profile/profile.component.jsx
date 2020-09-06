import React, { Fragment } from 'react';
import './profile.styles.scss';
import UserPost from '../../components/user-post/user-post.component';

const Profile = () => {
    return (
        <Fragment>
            <div className='profile'>
                <div className="profile-user">
                    <img src="/me.jpg" alt="profile img" className='profile-user-img' />
                    <h3 className='profile-user-name'>Alluysios Arriba</h3>
                    <p className='profile-user-bio'>I live to code</p>
                    <hr className="divider"/>
                </div>

                <div className="profile-about">
                    <h4 className='profile-about-heading'> About me </h4>
                    <div className='profile-about-item'>Joined: September 5, 2020</div>
                    <hr></hr>
                    <div className='profile-about-item'>Hobby: Coding</div>
                </div>
                <div className="profile-posts">
                    {/*TODO: loop post item here*/ }
                    <UserPost />
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;
