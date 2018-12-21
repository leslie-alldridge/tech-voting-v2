import React from 'react';

const AdminStatusSelector = props => {
  return (
    <span>
      Status: {props.suggestion.status}
      <select onChange={e => props.handleStatusUpdate(e, props.suggestion.id)}>
        <option>Pick a new status</option>
        <option name="completed">Completed</option>
        <option name="consideration">Under Consideration</option>
        <option name="progress">In Progress</option>
        <option name="closed">Closed</option>
      </select>
      <button
        id="delBtn"
        className="button is-danger"
        onClick={() => props.deleteIdea(props.suggestion.id)}
      >
        Delete
      </button>
    </span>
  );
};

export default AdminStatusSelector;
