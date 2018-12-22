import React from 'react';

const AdminStatusSelector = props => {
  return (
    <span>
      <b>|| Status</b>: <i>{props.suggestion.status}</i>
      <select
        id="adminSelect"
        className="select"
        onChange={e => props.handleStatusUpdate(e, props.suggestion.id)}
      >
        <option>Pick a new status</option>
        <option name="completed">Completed</option>
        <option name="consideration">Under Consideration</option>
        <option name="progress">In Progress</option>
        <option name="closed">Closed</option>
      </select>
      {props.confirmDelete === 1 &&
      props.suggestion.id === props.itemToDelete ? (
        <button
          id="delBtn"
          className="button is-danger"
          onClick={() => props.deleteIdea(props.suggestion.id)}
        >
          Confirm
        </button>
      ) : (
        <button
          id="delBtn"
          className="button is-danger"
          onClick={() => props.deleteIdea(props.suggestion.id)}
        >
          Delete
        </button>
      )}
    </span>
  );
};

export default AdminStatusSelector;
