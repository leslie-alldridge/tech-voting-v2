import React from "react";

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
        {props.username == "Laurence" && (
          <button
            onClick={() => {
              props.deleteComment(props.comment);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
};

export default SingleComment;
