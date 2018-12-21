import React from 'react';

import StatusDropdown from './StatusDropdown';
import CategoryDropdown from './CategoryDropdown';
import Search from './Search';

const TopBar = props => {
  return (
    <div>
      <h2 id="title2" className="title is-2 has-text-centered">
        Popular Improvements
      </h2>
      <hr />

      <div id="buttons" className="container">
        <div className={props.dropdown}>
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu3"
              onClick={props.toggleDrop}
            >
              <span>{props.filterActive}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>
          <StatusDropdown filterIdeas={props.filterIdeas} />
        </div>
        <div id="categoryDrop" className={props.dropdownCat}>
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu3"
              onClick={props.toggleDropCat}
            >
              <span>{props.categoryAction}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>
          <CategoryDropdown changeCategory={props.changeCategory} />
        </div>
        <a
          id="sendFeedback"
          target="_blank"
          href="https://confluence.teamxero.com/pages/viewpage.action?pageId=194813287"
          className="button is-link is-rounded"
        >
          Send Feedback
        </a>
        <a onClick={props.togglePage} className="button is-link is-rounded">
          Add Improvement
        </a>
        <Search searchEntry={props.searchEntry} />
      </div>
      <hr />
      {props.liked && (
        <p className="likeMessage animated3" id="likeMessage">
          Item Liked! Thanks for your feedback.
        </p>
      )}
      {props.commented && (
        <p className="likeMessage animated3" id="likeMessage">
          Comment Saved! Thanks for your feedback.
        </p>
      )}
    </div>
  );
};

export default TopBar;
