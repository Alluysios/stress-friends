import React, { useEffect, Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './post-view.styles.scss';

import CommentItem from '../comment-item/comment-item.component';
import CommentForm from '../comment-form/comment-form.component';

import { getPost, getAllComments } from '../../actions/posts.action';

const PostView = ({ getPost, getAllComments, post: { post, comments }, auth: { user }, match }) => {

    useEffect(() => {
        getPost(match.params.pid);
        getAllComments();
    }, [getPost, getAllComments, match.params.pid])
    return (
        !post ? <div>Loading...</div> 
        :
        <div className='post'>
            <Link to='/' className='back-btn'>&larr; Back</Link>
            <div className="post-box">
                <img src={`/uploads/posts/${post.images[0]}`} alt={post.content} className="post-image"/>
            </div>
            <div className="post-box-2">
                <div className="post-user">
                    <img src={`/uploads/users/${user.image}`} alt={user.firstname} className='post-user-image' />
                    <div>
                        <div className="post-user-name">{user.firstname} {user.lastname}</div>
                        <Moment className='posts-user-date' fromNow>{post.date}</Moment>
                    </div>
                    <p className='post-user-content'>
                        {post.content}
                    </p>
                </div>
                <div className="post-comments">
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
        </div>
    )
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth,
})

export default connect(mapStateToProps, { getPost, getAllComments })(PostView);
