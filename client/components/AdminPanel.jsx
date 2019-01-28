import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getUsersAction, deleteUserAction } from "../actions/users";

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: 0
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  confirm() {
    this.setState({
      confirm: 1
    });
  }

  deleteUser(user) {
    this.props.deleteUser(user);
    this.setState({
      confirm: 0
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
        Current Users:
        <div className="content">
          <ul>
            {this.props.suggestions.usersList &&
              this.props.suggestions.usersList.map(user => {
                return (
                  <li>
                    {user.user_name}{" "}
                    {this.state.confirm == 0 && (
                      <button
                        onClick={this.confirm}
                        className="button is-danger"
                      >
                        Delete
                      </button>
                    )}
                    {this.state.confirm == 1 && (
                      <button
                        onClick={() => {
                          this.deleteUser(user.user_name);
                        }}
                        className="button is-danger"
                      >
                        Confirm
                      </button>
                    )}
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
