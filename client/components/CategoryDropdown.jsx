import React from 'react';

const CategoryDropdown = props => {
  return (
    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
      <div className="dropdown-content">
        <a
          onClick={props.changeCategory}
          href="#"
          className="dropdown-item"
          name="improvement"
        >
          Process Updates
        </a>
        <a
          onClick={props.changeCategory}
          href="#"
          className="dropdown-item"
          name="team"
        >
          Team Improvements
        </a>
        <a
          onClick={props.changeCategory}
          href="#"
          className="dropdown-item"
          name="idea"
        >
          New Ideas
        </a>
        <a
          onClick={props.changeCategory}
          href="#"
          className="dropdown-item"
          name="all"
        >
          All
        </a>
      </div>
    </div>
  );
};

export default CategoryDropdown;
