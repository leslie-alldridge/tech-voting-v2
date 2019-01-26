import React from "react";
import { connect } from "react-redux";
import { loginUser, loginError } from "../actions/auth/login";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: ""
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
    let { user_name, password } = this.state;
    this.props.dispatch(loginUser({ user_name, password }));
  }
  render() {
    const { auth } = this.props;
    return (
      <div className="container" id="formContainer">
        <form className="form box" onSubmit={this.submit}>
          <h1 className="title is-2 has-text-centered">Login</h1>
          <hr />
          {auth.errorMessage && (
            <span className="has-text-danger is-large">
              {auth.errorMessage}
            </span>
          )}
          <label className="label is-large has-text-centered ">
            Username
            <div className="control has-icons-left">
              <input
                required
                className="input is-rounded has-text-centered is-large is-fullwidth "
                autoComplete="username"
                type="text"
                name="user_name"
                onChange={this.updateDetails}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </label>
          <label className="label is-large has-text-centered">
            Password
            <div className="control has-icons-left">
              <input
                required
                autoComplete="current-password"
                className="input is-rounded has-text-centered is-large is-fullwidth"
                type="password"
                name="password"
                onChange={this.updateDetails}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </div>
          </label>
          <input
            className="button is-rounded is-large is-fullwidth is-success"
            value="Login"
            type="submit"
          />
        </form>
        <p id="forgot">
          Forgot password? <a href="/#/forgot">Click here</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Login);
