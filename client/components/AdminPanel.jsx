import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getUsersAction, deleteUserAction } from "../actions/users";

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: 0,
      user: ""
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  confirm(user) {
    this.setState({
      confirm: 1,
      user: user
    });
  }

  deleteUser(user) {
    this.props.deleteUser(user);
    this.setState({
      confirm: 0,
      user: ""
    });
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
        <div id="adminBox">
        <b>Current Users:</b>
        <div className="content">
          <ul>
            {this.props.suggestions.usersList &&
              this.props.suggestions.usersList.map(user => {
                return (
                  <li key={user.user_name}>
                    {user.user_name}{" "}
                    {this.state.confirm == 0 && (
                      <button
                      id="delUser"
                        onClick={() => {
                          this.confirm(user);
                        }}
                        className="button is-danger"
                      >
                        Delete
                      </button>
                    )}
                    {this.state.confirm == 1 &&
                      this.state.user.user_name == user.user_name && (
                        <button
                          onClick={() => {
                            this.deleteUser(user.user_name);
                          }}
                          className="button is-danger"
                        >
                          Confirm
                        </button>
                      )}
                    {this.state.confirm == 1 &&
                      this.state.user.user_name !== user.user_name && (
                        <button
                          onClick={() => {
                            this.confirm(user);
                          }}
                          className="button is-danger"
                        >
                          Delete
                        </button>
                      )}
                  </li>
                );
              })}
          </ul>
        </div>
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
    },
    deleteUser: user => {
      dispatch(deleteUserAction(user));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPanel);
