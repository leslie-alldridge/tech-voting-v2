import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';
import Nav from './Nav';

const App = ({ auth }) => (
  <Router>
    <div className="container has-text-centered">
      <div className="hero is-small is-primary">
        <div className="hero-body has-text-centered">
          <Link to="/" className="">
            <h1 className="title is-1">CX-Tech Hub</h1>
          </Link>
          <Nav />
        </div>
      </div>

      <div className="">
        {!auth.isAuthenticated && <Route exact path="/" component={Login} />}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </div>
  </Router>
);

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(App);
