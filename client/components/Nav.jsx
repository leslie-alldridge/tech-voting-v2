import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../actions/auth/logout";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBurger: false
    };
    this.toggleBurger = this.toggleBurger.bind(this);
  }
  toggleBurger() {
    this.setState({ showBurger: !this.state.showBurger });
  }
  render() {
    const { auth, logout } = this.props;
    const { showBurger } = this.state;
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            {auth.isAuthenticated ? (
              <p id="loggedInText">
                <b>Logged in as: {auth.user.user_name}</b>
              </p>
            ) : (
              <p>Please register or login</p>
            )}
            <span
              onClick={this.toggleBurger}
              className={`navbar-burger burger ${
                showBurger ? "is-active" : ""
              }`}
              data-target="navbarMenuHeroA"
            >
              <span />
              <span />
              <span />
            </span>
          </div>
          <div
            id="navbarMenuHeroA"
            className={`navbar-menu ${showBurger ? "is-active" : ""}`}
          >
            <div className="navbar-end">
              {auth.isAuthenticated
                ? [
                    <Link
                      key="logout"
                      id="loggedInText"
                      to="/"
                      className="navbar-item"
                      onClick={() => logout()}
                    >
                      <b>Logout</b>
                    </Link>,
                    <Link
                      key="help"
                      className="navbar-item"
                      id="loggedInText"
                      to="/help"
                    >
                      <b>Help</b>
                    </Link>,
                    <Link
                      key="home"
                      className="navbar-item"
                      id="loggedInText"
                      to="/"
                    >
                      <b>Home</b>
                    </Link>,
                    auth.user.user_name === "Laurence" ? (
                      <Link
                        key="admin"
                        className="navbar-item"
                        id="loggedInText"
                        to="/adminpanel"
                      >
                        <b>Admin</b>
                      </Link>
                    ) : null
                  ]
                : [
                    <Link
                      onClick={this.toggleBurger}
                      className="navbar-item is-large"
                      to="/login"
                      key="login"
                    >
                      Login
                    </Link>,
                    <Link
                      key="register"
                      onClick={this.toggleBurger}
                      className="navbar-item"
                      to="/register"
                    >
                      Register
                    </Link>,
                    <Link
                      key="help"
                      onClick={this.toggleBurger}
                      className="navbar-item"
                      to="/help"
                    >
                      Help
                    </Link>
                  ]}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  };
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
