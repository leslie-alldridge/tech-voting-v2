import React from 'react';

const StatusPill = props => {
  return (
    <span
      data-aos="zoom-in"
      data-aos-duration="3000"
      className="button is-primary is-rounded is-pulled-right"
      id={props.suggestion.status}
    >
      {props.suggestion.status == 'completed'
        ? 'Completed'
        : props.suggestion.status == 'consideration'
        ? 'Under Consideration'
        : props.suggestion.status == 'closed'
        ? 'Closed'
        : 'In Progress'}
    </span>
  );
};

export default StatusPill;
