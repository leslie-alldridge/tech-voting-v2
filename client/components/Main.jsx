import React from 'react';
import { connect } from 'react-redux';
import { addSuggestionAction } from '../actions/suggestions';
import { runInThisContext } from 'vm';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPage: false
    };
    this.togglePage = this.togglePage.bind(this);
  }

  componentDidMount() {
    this.props.addSuggestion();
  }

  togglePage() {
    this.setState({
      addPage: true
    });
  }

  render() {
    const { suggestions } = this.props.suggestions;
    suggestions
      ? suggestions.sort((a, b) => b.votes - a.votes)
      : suggestions == suggestions;
    return (
      <div className="container">
        {!this.state.addPage && (
          <div>
            <h2 id="mainTitle" className="title is-2 has-text-centered">
              Popular Improvements
            </h2>
            <hr />
            <div id="buttons" className="container has-text-centered">
              <a
                target="_blank"
                href="https://www.atlassian.com/software/confluence"
                className="button is-link is-rounded"
              >
                Send Feedback
              </a>
              <a
                onClick={this.togglePage}
                className="button is-link is-rounded"
              >
                Add Improvement
              </a>
            </div>
            <hr />
          </div>
        )}
        {this.props.suggestions.suggestions &&
          suggestions.map(suggestion => {
            return (
              <article key={suggestion.id} className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={`/${suggestion.category}.png`} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong id="ideaTitle">{suggestion.title}</strong>
                      <br />
                      {suggestion.description}
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
                          <strong id="votes">{suggestion.votes}</strong>
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
              </article>
            );
          })}
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

function mapDispatchToProps(dispatch) {
  return {
    addSuggestion: () => {
      dispatch(addSuggestionAction());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
