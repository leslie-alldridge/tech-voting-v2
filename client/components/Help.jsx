import React from "react";
import { Link } from "react-router-dom";
const Help = props => {
  return (
    <div>
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered" id="helpTitle">
              Help Page
            </h1>
            <h2 className="subtitle has-text-centered">
              If you cannot find the answer please contact Leslie
            </h2>
          </div>
        </div>
        <div className="tab-pane" id="pane-3">
          <div className="columns">
            <div className="container ">
              <div className="columns">
                <div className="column">
                  <article className="media">
                    <div className="media-left">
                      <i className="fas fa-info-circle fa-4x" />
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong>The purpose of this website</strong>
                          <br /> It is a place to collate feedback for CX-Tech
                          whether it be new ideas, improvements, ways we can
                          work together or anything else you wish to share.
                          Please place constructive comments and remain on
                          topic.
                        </p>
                      </div>
                    </div>
                  </article>
                  <article className="media">
                    <div className="media-left">
                      <i className="fab fa-empire fa-4x" />
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong>What can I do here?</strong>
                          <br /> You can filter, search and browse current ideas
                          and suggestions. There's a button to add your own
                          towards the top of the page. Depending on your request
                          (e.g. Feedback for KA's), it may need to go via
                          Confluence.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="column">
                  <article className="media">
                    <div className="media-left">
                      <i className="fab fa-ravelry fa-4x" />
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong>This is neat</strong>
                          <br /> Thanks for your feedback. It took a while to
                          create and I am more than happy to explain or share
                          certain parts of the source code if you'd like me to.
                          If you have any feature requests or feedback please
                          reach out.
                        </p>
                      </div>
                    </div>
                  </article>
                  <article className="media">
                    <div className="media-left">
                      <i className="fas fa-ban fa-4x" />
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong>
                            My post was removed / set to cancelled.
                          </strong>
                          <br /> Please reach out to Laurence or Rob as they're
                          in control of setting statuses, deleting users,
                          comments and removing posts. They'll follow up over
                          Slack to give you a heads up.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        <br />
      </section>
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
      </div>
      <div className="footer">
        <p className="has-text-centered" id="footerHelp">
          Created 2018 - Leslie Alldridge CX-Tech
        </p>
      </div>
    </div>
  );
};

export default Help;
