import React from 'react';
import { connect } from 'react-redux';
import { addSuggestionAction } from '../actions/suggestions';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.addSuggestion();
  }

  render() {
    const { suggestions } = this.props.suggestions;
    return (
      <div className="container">
        <h2 id="mainTitle" className="title is-2 has-text-centered">
          Popular Improvements
        </h2>
        <hr />
        {this.props.suggestions.suggestions &&
          suggestions.map(suggestion => {
            return (
              <article className="media">
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
