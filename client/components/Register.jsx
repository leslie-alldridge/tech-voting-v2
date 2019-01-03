import React from "react";
import { connect } from "react-redux";
import { registerUserRequest } from "../actions/auth/register";
import { loginError } from "../actions/auth/login";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
      confirm_password: ""
    };
    this.updateDetails = this.updateDetails.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(loginError(""));
  }
  updateDetails(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submit(e) {
    e.preventDefault();
    e.target.reset();
    let { user_name, password, confirm_password } = this.state;
    if (confirm_password != password)
      return this.props.dispatch(loginError("Passwords don't match"));
    this.props.dispatch(registerUserRequest(this.state));
  }
  render() {
    const { auth } = this.props;
    return (
      <div className="container" id="formContainer">
        <form className="Register form box" onSubmit={this.submit}>
          <h1 className="title is-2 has-text-centered">Register</h1>
          <hr />
          {auth.errorMessage && (
            <span className="has-text-danger is-large">
              {auth.errorMessage}
            </span>
          )}
          <label className="column is-6 is-offset-one-quarter label is-large has-text-centered">
            Username
            <div className="control has-icons-left">
              <input
                required
                className="input is-rounded is-large has-text-centered is-fullwidth"
                type="text"
                name="user_name"
                onChange={this.updateDetails}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </label>
          <br />
          <div className="columns">
            <label className="column is-6 label is-large has-text-centered">
              Password
              <div className="control has-icons-left">
                <input
                  required
                  className="input is-rounded is-large has-text-centered is-fullwidth"
                  type="password"
                  name="password"
                  onChange={this.updateDetails}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </div>
            </label>
            <label className="column is-6 label is-large has-text-centered">
              Confirm Password
              <div className="control has-icons-left">
                <input
                  required
                  className="input is-rounded is-large has-text-centered is-fullwidth"
                  type="password"
                  name="confirm_password"
                  onChange={this.updateDetails}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </div>
            </label>
          </div>
          <input
            className="button is-success is-rounded is-large is-fullwidth"
            value="Register"
            type="submit"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Register);
