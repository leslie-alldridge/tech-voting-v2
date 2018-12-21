import React from 'react';

const SingleComment = props => {
  return (
    <article id={props.comment.user} className="message is-success">
      <div className="message-header">
        <p id="commentHead">
          Posted by: <b>{props.comment.user}</b>
        </p>
      </div>
      <div className="message-body">
        <i>{props.comment.comment}</i>
      </div>
    </article>
  );
};

export default SingleComment;
