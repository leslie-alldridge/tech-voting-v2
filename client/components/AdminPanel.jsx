import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUsersAction } from '../actions/users';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: 0
    };
  }

  render() {
    return (
      <div>
        <h2 id="title2" className="title is-2 has-text-centered">
          Admin Panel
        </h2>
        <hr />
        <h2 id="title2" className="title is-4 has-text-centered">
          Delete Users
        </h2>
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
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => {
      dispatch(getUsersAction());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
