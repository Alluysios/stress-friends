import React, { Fragment, useEffect } from 'react';
import Posts from '../../components/posts/posts.component';
import { connect } from 'react-redux';
import { getAllPosts, getAllComments } from '../../actions/posts.action';

const Landing = ({ getAllPosts, getAllComments }) => {
    useEffect(() => {
        getAllPosts();
        getAllComments(); 
    }, [getAllPosts, getAllComments])
    
    return (
        <Fragment>
            <Posts />
        </Fragment>
    )
}

export default connect(null, { getAllPosts, getAllComments })(Landing);
