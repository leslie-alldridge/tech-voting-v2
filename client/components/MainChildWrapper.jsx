import React from "react";

import SuggestionArticle from "./SuggestionArticle";
import CommentEntry from "./CommentEntry";
import SingleComment from "./SingleComment";

const MainChildWrapper = props => {
  return (
    <div
      id="articleDiv"
      data-aos="zoom-in"
      data-aos-duration="6000"
      key={props.suggestion.id}
    >
      <SuggestionArticle
        commentsLoad={props.commentsLoad}
        suggestion={props.suggestion}
        username={props.username}
        handleStatusUpdate={props.handleStatusUpdate}
        deleteIdea={props.deleteIdea}
        confirmDelete={props.confirmDelete}
        itemToDelete={props.itemToDelete}
        adminComment={props.adminComment}
        handleComment={props.handleComment}
        handleLike={props.handleLike}
        toggleComments={props.toggleComments}
      />
      {props.stateComment && props.stateid == props.suggestion.id && (
        <CommentEntry
          handleCommentEntry={props.handleCommentEntry}
          submitComment={props.submitComment}
          userComment={props.userComment}
        />
      )}
      {props.showComment &&
        props.stateid == props.suggestion.id &&
        props.commentProps &&
        props.commentProps.map(comment => {
          if (comment.id === props.stateid) {
            return (
              <SingleComment
                key={comment.commentid}
                deleteComment={props.deleteComment}
                comment={comment}
                username={props.username}
              />
            );
          }
        })}
      {props.showComment && props.stateid == props.suggestion.id && (
        <a id="topLink" href="#">
          Top
        </a>
      )}
    </div>
  );
};
export default MainChildWrapper;
