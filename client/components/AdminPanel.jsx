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

  componentDidMount() {
    this.props.getUsers();
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
        Current Users:
        <div className="content">
          <ul>
            {this.props.suggestions.usersList &&
              this.props.suggestions.usersList.map(user => {
                return (
                  <li>
                    {user.user_name}{' '}
                    <button className="button is-danger">Delete</button>
                  </li>
                );
              })}
          </ul>
        </div>
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
    suggestions: state.suggestions
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
