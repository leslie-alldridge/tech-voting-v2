import React from "react";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
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
                <i className="fas fa-user" />
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

export default ForgotPassword;
