import React from "react";
import { connect } from "react-redux";
import { newPasswordAction } from "../actions/users";
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: "" };
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
    console.log(this.state);
    console.log("hit");
    this.props.newPassword(this.state.password, this.props.match.params.token);
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
    newPassword: (pw, token) => {
      dispatch(newPasswordAction(pw, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
