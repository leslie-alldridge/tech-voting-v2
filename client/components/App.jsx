import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';
import Nav from './Nav';
import Main from './Main';
import Help from './Help';

const App = ({ auth }) => (
  <Router>
    <div>
      <div className=" has-text-centered">
        <div id="bgTitle" className="hero is-small is-primary">
          <div className="hero-body has-text-centered">
            <Link to="/" className="">
              <h1 id="techHub" className="title is-1">
                CX-Tech Hub
              </h1>
            </Link>
            <Nav />
          </div>
        </div>
      </div>
      <div className="">
        {!auth.isAuthenticated && <Route exact path="/" component={Login} />}
        {auth.isAuthenticated && <Route exact path="/" component={Main} />}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/help" component={Help} />
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
