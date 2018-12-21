import React from 'react';

const StatusDropdown = props => {
  return (
    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
      <div className="dropdown-content">
        <a
          onClick={props.filterIdeas}
          href="#"
          className="dropdown-item"
          name="consideration"
        >
          Under Consideration
        </a>
        <a
          onClick={props.filterIdeas}
          href="#"
          className="dropdown-item"
          name="progress"
        >
          In Progress
        </a>
        <a
          onClick={props.filterIdeas}
          href="#"
          className="dropdown-item"
          name="completed"
        >
          Completed
        </a>
        <a
          onClick={props.filterIdeas}
          href="#"
          className="dropdown-item"
          name=""
        >
          All
        </a>
      </div>
    </div>
  );
};

export default StatusDropdown;
