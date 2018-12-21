import React from 'react';

const CommentEntry = props => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              onChange={props.handleCommentEntry}
              className="textarea"
              placeholder="Add a comment..."
            />
          </p>
        </div>
        {props.userComment !== '' && (
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <a
                  onClick={props.submitComment}
                  className="button is-link"
                  id="commentBtn"
                >
                  Submit
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </article>
  );
};

export default CommentEntry;
