import React from 'react';
import { connect } from 'react-redux';

import {
  getSuggestionAction,
  upVoteAction,
  addCommentAction,
  getCommentsAction
} from '../actions/suggestions';
import AddPage from './AddPage';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPage: false,
      id: '',
      comment: false,
      userComment: '',
      showComment: false,
      commentData: [] || suggestions.comments
    };
    this.togglePage = this.togglePage.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleCommentEntry = this.handleCommentEntry.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
  }

  componentDidMount() {
    this.props.getSuggestion();
  }

  togglePage() {
    this.setState({
      addPage: !this.state.addPage
    });
  }

  handleLike(id, e) {
    e.preventDefault();
    this.props.upVote(id);
  }

  handleComment(id, e) {
    e.preventDefault();
    if (id == this.state.id) {
      this.setState({
        comment: !this.state.comment,
        showComment: false,
        commentData: this.props.suggestions.comments
      });
    } else {
      this.setState({
        comment: true,
        id: id,
        showComment: false,
        commentData: this.props.suggestions.comments
      });
    }
  }

  handleCommentEntry(e) {
    this.setState({
      userComment: [e.target.value]
    });
  }

  submitComment() {
    this.setState({
      showComment: false,
      comment: !this.state.comment
    });
    this.props.addComment(
      this.state.userComment,
      this.state.id,
      this.props.auth.user.user_name
    );
    this.props.getSuggestion();
    this.props.getComments();
  }

  toggleComments(id, e) {
    e.preventDefault();
    if (id == this.state.id) {
      this.setState({
        showComment: !this.state.showComment,
        comment: false
      });
    } else {
      this.setState({
        showComment: true,
        id: id,
        comment: false
      });
    }
  }

  render() {
    const suggestions = this.props.suggestions.suggestion;

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
            {this.props.suggestions.liked && (
              <p className="likeMessage animated3" id="likeMessage">
                Item Liked! Thanks for your feedback.
              </p>
            )}
            {this.props.suggestions.commented && (
              <p className="likeMessage animated3" id="likeMessage">
                Comment Saved! Thanks for your feedback.
              </p>
            )}
          </div>
        )}
        {this.props.suggestions.suggestion &&
          !this.state.addPage &&
          suggestions.map(suggestion => {
            return (
              <div key={suggestion.id}>
                <article key={suggestion.id} className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src={`/${suggestion.category}.png`} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong id="ideaTitle">{suggestion.title}</strong>{' '}
                        <span id="consideration">Under Consideration</span>
                        <br />
                        {suggestion.description}
                      </p>
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <a
                          onClick={e => this.handleComment(suggestion.id, e)}
                          id="secondIcon"
                          name={suggestion.id}
                          className="level-item"
                        >
                          <span className="icon is-medium">
                            <i className="fas fa-reply" />
                          </span>
                        </a>
                        <a
                          onClick={e => this.handleLike(suggestion.id, e)}
                          id="secondIcon"
                          name={suggestion.id}
                          className="level-item"
                        >
                          <span className="icon is-medium">
                            <i id="like" className="fas fa-heart" />
                            <strong id="votes">{suggestion.votes}</strong>
                          </span>
                        </a>
                        <a
                          onClick={e => this.toggleComments(suggestion.id, e)}
                          id="secondIcon"
                          name={suggestion.id}
                          className="level-item"
                        >
                          <span className="icon is-medium">
                            <i id="like" className="fas fa-comments" />
                            <strong id="votes">
                              {suggestion.commentcount}
                            </strong>
                          </span>
                        </a>
                      </div>
                      <p>
                        <i id="submittedBy">Submitted by:</i>{' '}
                        <b id="submittedBy">{suggestion.user}</b>
                      </p>
                    </nav>
                  </div>
                </article>
                {this.state.comment && this.state.id == suggestion.id && (
                  <article className="media">
                    <div className="media-content">
                      <div className="field">
                        <p className="control">
                          <textarea
                            onChange={this.handleCommentEntry}
                            className="textarea"
                            placeholder="Add a comment..."
                          />
                        </p>
                      </div>
                      <nav className="level">
                        <div className="level-left">
                          <div className="level-item">
                            <a
                              onClick={this.submitComment}
                              className="button is-info"
                            >
                              Submit
                            </a>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </article>
                )}
                {this.state.showComment &&
                  this.state.id == suggestion.id &&
                  this.props.suggestions.comments &&
                  this.props.suggestions.comments.map(comment => {
                    if (comment.id === this.state.id) {
                      return (
                        <article key={comment.comment} className="media">
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{comment.user}</strong>
                                <br />
                                {comment.comment}
                                <br />
                              </p>
                            </div>
                          </div>
                        </article>
                      );
                    }
                  })}
              </div>
            );
          })}

        {this.state.addPage && <AddPage togglePage={this.togglePage} />}
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
    getSuggestion: () => {
      dispatch(getSuggestionAction());
    },
    upVote: id => {
      dispatch(upVoteAction(id));
    },
    addComment: (comment, id, name) => {
      dispatch(addCommentAction(comment, id, name));
    },
    getComments: () => {
      dispatch(getCommentsAction());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
