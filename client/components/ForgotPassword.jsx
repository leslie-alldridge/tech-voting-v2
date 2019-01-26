import React from "react";

import { connect } from "react-redux";
import { resetPasswordAction } from "../actions/users";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", emailSent: false };
    this.updateDetails = this.updateDetails.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateDetails(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    this.props.resetPassword(this.state.email);
    this.setState({
      emailSent: true
    });
  }

  render() {
    return (
      <div className="container" id="formContainer">
        <form className="form box" onSubmit={this.submit}>
          <h1 className="title is-2 has-text-centered">Forgot Password</h1>
          <hr />
          <label className="label is-large has-text-centered ">
            Email Address
            <div className="control has-icons-left">
              <input
                required
                className="input is-rounded has-text-centered is-large is-fullwidth "
                type="email"
                name="email"
                onChange={this.updateDetails}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </label>
          <input
            className="button is-rounded is-large is-fullwidth is-success"
            value="Reset Password"
            type="submit"
          />
        </form>
        {this.state.emailSent && <p id="msg">{this.props.suggestions.res}</p>}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, suggestions }) => {
  return {
    auth,
    suggestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => {
      dispatch(resetPasswordAction(email));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
