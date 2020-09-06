import React, { Fragment, useState } from 'react';
import "./comment-item.styles.scss";

import CommentReplyForm from '../comment-reply-form/comment-reply-form.component';

const CommentItem = () => {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <div className="comment">
                <div className="comment-user">
                    <img src="/us.jpg" alt="post comment temp" className="comment-user-img"/>
                    <div className="group">
                        <span className="comment-user-name">Alluysios Arriba</span>
                        <span className="comment-user-date">Posted: January 20, 2020</span>
                    </div>
                </div>
                <span className='comment-content'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut consectetur dolor doloremque nam pariatur ea perferendis maxime totam dignissimos nobis iure.
                </span>
                <div className="comment-options">
                    <span className="options-small">like</span>
                    <span className="options-small" onClick={() => setShow(!show)}>reply</span>
                    <span className="options-small">edit</span>
                    <span className="options-small">delete</span>
                </div>
                <CommentReplyForm show={show} />
                <div className="comment-reply">
                    <div className="comment-user">
                        <img src="/us.jpg" alt="post comment temp" className="comment-reply-user"/>
                        <div className="group">
                            <span className="comment-reply-name">Quennie Omblero</span>
                            <span className="comment-reply-date">Posted: January 20, 2020</span>
                        </div>
                    </div>
                    <span className='comment-content'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut consectetur dolor doloremque nam pariatur ea perferendis maxime totam dignissimos nobis iure.
                    </span>
                    <div className="comment-options">
                        <span className="options-small">like</span>
                        <span className="options-small">edit</span>
                        <span className="options-small">delete</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CommentItem;
