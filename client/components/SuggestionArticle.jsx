import React from 'react';

import AdminStatusSelector from './AdminStatusSelector';
import StatusPill from './StatusPill';

const SuggestionArticle = props => {
  return (
    <article id="rowIdea" key={props.suggestion.id} className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={`/${props.suggestion.category}.png`} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong id="ideaTitle">{props.suggestion.title}</strong>{' '}
            {/* Remove the statuses for Laurence */}
            {props.username !== 'Laurence' && (
              <StatusPill suggestion={props.suggestion} />
            )}
            {/* Laurence should have a selector to pick the right status */}
            {props.username === 'Laurence' && (
              <AdminStatusSelector
                suggestion={props.suggestion}
                handleStatusUpdate={props.handleStatusUpdate}
                deleteIdea={props.deleteIdea}
                confirmDelete={props.confirmDelete}
                itemToDelete={props.itemToDelete}
              />
            )}
            <br />
            <div id="desc">{props.suggestion.description}</div>
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            {props.adminComment.includes(props.suggestion.id) && (
              <a
                id="secondIcon"
                name={props.suggestion.id}
                className="level-item"
              >
                <span className="icon is-medium">
                  <i id="admin" className="fas fa-trophy" />{' '}
                </span>
              </a>
            )}
            <a
              onClick={e => props.handleComment(props.suggestion.id, e)}
              id="secondIcon"
              name={props.suggestion.id}
              className="level-item"
            >
              <span className="icon is-medium tooltip">
                <span className="tooltiptext">Add Comment</span>
                <i className="fas fa-reply " />
              </span>
            </a>
            <a
              onClick={e => props.handleLike(props.suggestion.id, e)}
              id="secondIcon"
              name={props.suggestion.id}
              className="level-item"
            >
              <span className="icon is-medium tooltip">
                <span className="tooltiptext">Add Vote</span>
                <i id="like" className="fas fa-heart" />
                <strong id="votes">{props.suggestion.votes}</strong>
              </span>
            </a>
            <a
              onClick={e => props.toggleComments(props.suggestion.id, e)}
              id="secondIcon"
              name={props.suggestion.id}
              className="level-item"
            >
              <span className="icon is-medium tooltip">
                <span className="tooltiptext">All Comments</span>
                <i id="like" className="fas fa-comments" />
                <strong id="votes">{props.suggestion.commentcount}</strong>
              </span>
            </a>
          </div>
          <p>
            <i id="submittedBy">Submitted by:</i>{' '}
            <b id="submittedBy">{props.suggestion.user}</b>
          </p>
        </nav>
      </div>
    </article>
  );
};

export default SuggestionArticle;
