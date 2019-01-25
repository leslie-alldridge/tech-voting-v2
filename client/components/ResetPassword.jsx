import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { newPasswordAction } from "../actions/users";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "", pwSaved: false };
    this.updateDetails = this.updateDetails.bind(this);
    this.submit = this.submit.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.match);

    await axios
      .get("/api/users/reset", {
        params: {
          resetPasswordToken: this.props.match.params.token
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.message === "password reset link a-ok") {
          this.setState({
            username: response.data.username,
            update: false,
            isLoading: false,
            error: false
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true,
            details: response.data
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  updateDetails(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    this.props.newPassword(this.state.password, this.state.username);
    this.setState({
      pwSaved: true
    });
  }

  render() {
    return (
      <div className="container" id="formContainer">
        <form className="form box" onSubmit={this.submit}>
          <h1 className="title is-2 has-text-centered">Enter New Password</h1>
          <hr />
          <label className="label is-large has-text-centered ">
            New Password
            <div className="control has-icons-left">
              <input
                required
                className="input is-rounded has-text-centered is-large is-fullwidth "
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
            value="Reset Password"
            type="submit"
          />
        </form>
        {this.state.error == true && (
          <p>
            <b>There was an error: </b>
            {this.state.details}
          </p>
        )}
        {this.state.pwSaved && (
          <div className="has-text-centered">
            <Link
              className="has-text-centered button is-link is-rounded"
              id="home"
              to="/"
            >
              <b>
                <i className="fas fa-arrow-left" /> Home
              </b>
            </Link>
            <p>Password has been saved</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newPassword: (pw, user) => {
      dispatch(newPasswordAction(pw, user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
