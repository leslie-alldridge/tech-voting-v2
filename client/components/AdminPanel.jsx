import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = props => {
  return (
    <div>
      <h2 id="title2" className="title is-2 has-text-centered">
        Admin Panel
      </h2>
      <hr />
      <br />
      <div className="has-text-centered">
        <Link className="button has-text-centered" to="/">
          <b>
            <i className="fas fa-arrow-left" /> Home
          </b>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
