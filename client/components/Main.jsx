import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h2 id="mainTitle" className="title is-2 has-text-centered">
          Popular Improvements
        </h2>
        <hr />
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src="/idea.png" />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong id="ideaTitle">Stop Salesforce from freezing</strong>
                <br />
                To help us serve our current customers better and scale to five
                million users we will need a support interface that allows us to
                handle multiple cases with ease. Our current set up freezes
                often, causing our agents to wait a long time before then can
                send an email.
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-medium">
                    <i className="fas fa-reply" />
                  </span>
                </a>

                <a id="secondIcon" className="level-item">
                  <span className="icon is-medium">
                    <i id="like" className="fas fa-heart" />
                    <strong id="votes">11</strong>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src="/improvement.png" />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong id="ideaTitle">New wording for Status Page</strong>
                <br />
                Provide a #human experience for our users. We've received
                multiple complaints about our status page wording being a copy
                paste effort between outages.
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-medium">
                    <i className="fas fa-reply" />
                  </span>
                </a>

                <a id="secondIcon" className="level-item">
                  <span className="icon is-medium">
                    <i id="like" className="fas fa-heart" />
                    <strong id="votes">5</strong>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Main);
