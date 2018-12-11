import React from 'react';
import { connect } from 'react-redux';

import {
  getSuggestionAction,
  upVoteAction,
  addCommentAction,
  getCommentsAction,
  updateStatusAction,
  filterIdeasAction
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
      commentData: [] || suggestions.comments,
      dropdown: 'dropdown',
      filter: '',
      category: 'all',
      dropdownCat: 'dropdown',
      adminComment: [],
      searchEntry: '',
      filterActive: 'Filter Status',
      categoryAction: 'Category'
    };
    [
      'togglePage',
      'handleComment',
      'handleLike',
      'submitComment',
      'handleCommentEntry',
      'toggleComments',
      'handleStatusUpdate',
      'toggleDrop',
      'filterIdeas',
      'toggleDropCat',
      'changeCategory',
      'searchEntry'
    ].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidMount() {
    this.props.getSuggestion();
    this.props.getComments();
  }

  togglePage() {
    this.setState({
      addPage: !this.state.addPage
    });
  }

  handleLike(id, e) {
    e.preventDefault();
    this.props.upVote(id, this.props.auth.user.user_name);
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
    if (this.state.userComment[0].length < 5) {
      alert('Please enter a suitable comment.');
    } else {
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
  }

  toggleComments(id, e) {
    e.preventDefault();
    this.props.suggestions.comments.map(comment => {
      if (comment.id === id && comment.user === 'Laurence') {
        this.setState({
          adminComment: [...this.state.adminComment, id]
        });
      }
    });
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

  handleStatusUpdate(e, id) {
    let formattedText = '';
    if (e.target.value === 'Under Consideration') {
      formattedText = 'consideration';
    } else if (e.target.value === 'Completed') {
      formattedText = 'completed';
    } else {
      formattedText = 'progress';
    }
    this.props.updateStatus(formattedText, id);
  }

  toggleDrop() {
    this.state.dropdown === 'dropdown'
      ? this.setState({
          dropdown: 'dropdown is-active'
        })
      : this.setState({
          dropdown: 'dropdown'
        });
  }

  toggleDropCat() {
    this.state.dropdownCat === 'dropdown'
      ? this.setState({
          dropdownCat: 'dropdown is-active'
        })
      : this.setState({
          dropdownCat: 'dropdown'
        });
  }

  filterIdeas(e) {
    if (e.target.name === '') {
      this.setState({
        dropdown: 'dropdown',
        filterActive: 'Filter Status'
      });
      this.props.getSuggestion();
      this.props.getComments();
    } else {
      this.setState({
        dropdown: 'dropdown',
        filterActive:
          e.target.name === 'consideration'
            ? 'Under Consideration'
            : e.target.name === 'completed'
            ? 'Completed'
            : 'In Progress'
      });
      this.props.filterIdeas(e.target.name);
    }
  }

  changeCategory(e) {
    this.setState({
      dropdownCat: 'dropdown',
      category: e.target.name,
      categoryAction:
        e.target.name === 'idea'
          ? 'New Ideas'
          : e.target.name === 'improvement'
          ? 'Process Updates'
          : e.target.name === 'team'
          ? 'Team Improvements'
          : 'Category'
    });
  }

  searchEntry(e) {
    this.setState({
      searchEntry: e.target.value
    });
  }

  render() {
    const suggestions = this.props.suggestions.suggestion;

    suggestions
      ? suggestions.sort((a, b) => b.votes - a.votes)
      : suggestions == suggestions;

    return (
      <div id="main" className="container">
        {!this.state.addPage && (
          <div>
            <h2 id="title2" className="title is-2 has-text-centered">
              Popular Improvements
            </h2>
            <hr />

            <div id="buttons" className="container ">
              <div className={this.state.dropdown}>
                <div className="dropdown-trigger">
                  <button
                    className="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu3"
                    onClick={this.toggleDrop}
                  >
                    <span>{this.state.filterActive}</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true" />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    <a
                      onClick={this.filterIdeas}
                      href="#"
                      className="dropdown-item"
                      name="consideration"
                    >
                      Under Consideration
                    </a>
                    <a
                      onClick={this.filterIdeas}
                      href="#"
                      className="dropdown-item"
                      name="progress"
                    >
                      In Progress
                    </a>
                    <a
                      onClick={this.filterIdeas}
                      href="#"
                      className="dropdown-item"
                      name="completed"
                    >
                      Completed
                    </a>
                    <a
                      onClick={this.filterIdeas}
                      href="#"
                      className="dropdown-item"
                      name=""
                    >
                      All
                    </a>
                  </div>
                </div>
              </div>
              <div id="categoryDrop" className={this.state.dropdownCat}>
                <div className="dropdown-trigger">
                  <button
                    className="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu3"
                    onClick={this.toggleDropCat}
                  >
                    <span>{this.state.categoryAction}</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true" />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    <a
                      onClick={this.changeCategory}
                      href="#"
                      className="dropdown-item"
                      name="improvement"
                    >
                      Process Updates
                    </a>
                    <a
                      onClick={this.changeCategory}
                      href="#"
                      className="dropdown-item"
                      name="team"
                    >
                      Team Improvements
                    </a>
                    <a
                      onClick={this.changeCategory}
                      href="#"
                      className="dropdown-item"
                      name="idea"
                    >
                      New Ideas
                    </a>
                    <a
                      onClick={this.changeCategory}
                      href="#"
                      className="dropdown-item"
                      name="all"
                    >
                      All
                    </a>
                  </div>
                </div>
              </div>
              <a
                id="sendFeedback"
                target="_blank"
                href="https://confluence.teamxero.com/pages/viewpage.action?pageId=194813287"
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
              <div
                id="search"
                className="control has-icons-left has-icons-right"
              >
                <input
                  className="input"
                  type="email"
                  placeholder="Search here.."
                  onChange={this.searchEntry}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search" />
                </span>
              </div>
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
        {suggestions.length === 0 ? <p>No results</p> : null}
        {this.props.suggestions.suggestion &&
          !this.state.addPage &&
          suggestions.map(suggestion => {
            if (this.state.category === 'all') {
              if (this.state.searchEntry !== '') {
                if (suggestion.title.includes(this.state.searchEntry)) {
                  return (
                    <div
                      data-aos="zoom-in"
                      data-aos-duration="6000"
                      key={suggestion.id}
                    >
                      <article
                        id="rowIdea"
                        key={suggestion.id}
                        className="media"
                      >
                        <figure className="media-left">
                          <p className="image is-64x64">
                            <img src={`/${suggestion.category}.png`} />
                          </p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong id="ideaTitle">{suggestion.title}</strong>{' '}
                              {/* Remove the statuses for Laurence */}
                              {this.props.auth.user.user_name !==
                                'Laurence' && (
                                <span
                                  data-aos="zoom-in"
                                  data-aos-duration="3000"
                                  className="button is-primary is-rounded is-pulled-right"
                                  id={suggestion.status}
                                >
                                  {suggestion.status == 'completed'
                                    ? 'Completed'
                                    : suggestion.status == 'consideration'
                                    ? 'Under Consideration'
                                    : 'In Progress'}
                                </span>
                              )}
                              {/* Laurence should have a selector to pick the right status */}
                              {this.props.auth.user.user_name ===
                                'Laurence' && (
                                <span>
                                  Status: {suggestion.status}
                                  <select
                                    onChange={e =>
                                      this.handleStatusUpdate(e, suggestion.id)
                                    }
                                  >
                                    <option>Pick a new status</option>
                                    <option name="completed">Completed</option>
                                    <option name="consideration">
                                      Under Consideration
                                    </option>
                                    <option name="progress">In Progress</option>
                                  </select>
                                </span>
                              )}
                              <br />
                              <div id="desc">{suggestion.description}</div>
                            </p>
                          </div>
                          <nav className="level is-mobile">
                            <div className="level-left">
                              {this.state.adminComment.includes(
                                suggestion.id
                              ) && (
                                <a
                                  id="secondIcon"
                                  name={suggestion.id}
                                  className="level-item"
                                >
                                  <span className="icon is-medium">
                                    <i id="admin" className="fas fa-trophy" />{' '}
                                  </span>
                                </a>
                              )}
                              <a
                                onClick={e =>
                                  this.handleComment(suggestion.id, e)
                                }
                                id="secondIcon"
                                name={suggestion.id}
                                className="level-item"
                              >
                                <span className="icon is-medium tooltip">
                                  <span className="tooltiptext">
                                    Add Comment
                                  </span>
                                  <i className="fas fa-reply " />
                                </span>
                              </a>
                              <a
                                onClick={e => this.handleLike(suggestion.id, e)}
                                id="secondIcon"
                                name={suggestion.id}
                                className="level-item"
                              >
                                <span className="icon is-medium tooltip">
                                  <span className="tooltiptext">Add Vote</span>
                                  <i id="like" className="fas fa-heart" />
                                  <strong id="votes">{suggestion.votes}</strong>
                                </span>
                              </a>
                              <a
                                onClick={e =>
                                  this.toggleComments(suggestion.id, e)
                                }
                                id="secondIcon"
                                name={suggestion.id}
                                className="level-item"
                              >
                                <span className="icon is-medium tooltip">
                                  <span className="tooltiptext">
                                    All Comments
                                  </span>
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
                            {this.state.userComment !== '' && (
                              <nav className="level">
                                <div className="level-left">
                                  <div className="level-item">
                                    <a
                                      onClick={this.submitComment}
                                      className="button is-link"
                                      id="commentBtn"
                                    >
                                      Submit
                                    </a>
                                  </div>
                                </div>
                              </nav>
                            )}
                          </div>
                        </article>
                      )}
                      {this.state.showComment &&
                        this.state.id == suggestion.id &&
                        this.props.suggestions.comments &&
                        this.props.suggestions.comments.map(comment => {
                          if (comment.id === this.state.id) {
                            return (
                              <article
                                id="commentList"
                                className="message is-success"
                              >
                                <div className="message-header">
                                  <p id="commentHead">
                                    Posted by: <b>{comment.user}</b>
                                  </p>
                                </div>
                                <div className="message-body">
                                  <i>{comment.comment}</i>
                                </div>
                              </article>
                            );
                          }
                        })}
                      {this.state.showComment &&
                        this.state.id == suggestion.id && (
                          <a id="topLink" href="#">
                            Top
                          </a>
                        )}
                    </div>
                  );
                }
              } else {
                return (
                  <div
                    data-aos="zoom-in"
                    data-aos-duration="6000"
                    key={suggestion.id}
                  >
                    <article id="rowIdea" key={suggestion.id} className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <img src={`/${suggestion.category}.png`} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong id="ideaTitle">{suggestion.title}</strong>{' '}
                            {/* Remove the statuses for Laurence */}
                            {this.props.auth.user.user_name !== 'Laurence' && (
                              <span
                                data-aos="zoom-in"
                                data-aos-duration="3000"
                                className="button is-primary is-rounded is-pulled-right"
                                id={suggestion.status}
                              >
                                {suggestion.status == 'completed'
                                  ? 'Completed'
                                  : suggestion.status == 'consideration'
                                  ? 'Under Consideration'
                                  : 'In Progress'}
                              </span>
                            )}
                            {/* Laurence should have a selector to pick the right status */}
                            {this.props.auth.user.user_name === 'Laurence' && (
                              <span>
                                Status: {suggestion.status}
                                <select
                                  onChange={e =>
                                    this.handleStatusUpdate(e, suggestion.id)
                                  }
                                >
                                  <option>Pick a new status</option>
                                  <option name="completed">Completed</option>
                                  <option name="consideration">
                                    Under Consideration
                                  </option>
                                  <option name="progress">In Progress</option>
                                </select>
                              </span>
                            )}
                            <br />
                            <div id="desc">{suggestion.description}</div>
                          </p>
                        </div>
                        <nav className="level is-mobile">
                          <div className="level-left">
                            {this.state.adminComment.includes(
                              suggestion.id
                            ) && (
                              <a
                                id="secondIcon"
                                name={suggestion.id}
                                className="level-item"
                              >
                                <span className="icon is-medium">
                                  <i id="admin" className="fas fa-trophy" />{' '}
                                </span>
                              </a>
                            )}
                            <a
                              onClick={e =>
                                this.handleComment(suggestion.id, e)
                              }
                              id="secondIcon"
                              name={suggestion.id}
                              className="level-item"
                            >
                              <span className="icon is-medium tooltip">
                                <span className="tooltiptext">Add Comment</span>
                                <i className="fas fa-reply " />
                              </span>
                            </a>
                            <a
                              onClick={e => this.handleLike(suggestion.id, e)}
                              id="secondIcon"
                              name={suggestion.id}
                              className="level-item"
                            >
                              <span className="icon is-medium tooltip">
                                <span className="tooltiptext">Add Vote</span>
                                <i id="like" className="fas fa-heart" />
                                <strong id="votes">{suggestion.votes}</strong>
                              </span>
                            </a>
                            <a
                              onClick={e =>
                                this.toggleComments(suggestion.id, e)
                              }
                              id="secondIcon"
                              name={suggestion.id}
                              className="level-item"
                            >
                              <span className="icon is-medium tooltip">
                                <span className="tooltiptext">
                                  All Comments
                                </span>
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
                          {this.state.userComment !== '' && (
                            <nav className="level">
                              <div className="level-left">
                                <div className="level-item">
                                  <a
                                    onClick={this.submitComment}
                                    className="button is-link"
                                    id="commentBtn"
                                  >
                                    Submit
                                  </a>
                                </div>
                              </div>
                            </nav>
                          )}
                        </div>
                      </article>
                    )}
                    {this.state.showComment &&
                      this.state.id == suggestion.id &&
                      this.props.suggestions.comments &&
                      this.props.suggestions.comments.map(comment => {
                        if (comment.id === this.state.id) {
                          return (
                            <article
                              id="commentList"
                              className="message is-success"
                            >
                              <div className="message-header">
                                <p id="commentHead">
                                  Posted by: <b>{comment.user}</b>
                                </p>
                              </div>
                              <div className="message-body">
                                <i>{comment.comment}</i>
                              </div>
                            </article>
                          );
                        }
                      })}
                    {this.state.showComment && this.state.id == suggestion.id && (
                      <a id="topLink" href="#">
                        Top
                      </a>
                    )}
                  </div>
                );
              }
            } else if (suggestion.category === this.state.category) {
              if (this.state.searchEntry !== '') {
                if (suggestion.title.includes(this.state.searchEntry)) {
                  return (
                    <div
                      data-aos="zoom-in"
                      data-aos-duration="6000"
                      key={suggestion.id}
                    >
                      <article
                        id="rowIdea"
                        key={suggestion.id}
                        className="media"
                      >
                        <figure className="media-left">
                          <p className="image is-64x64">
                            <img src={`/${suggestion.category}.png`} />
                          </p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong id="ideaTitle">{suggestion.title}</strong>{' '}
                              {/* Remove the statuses for Laurence */}
                              {this.props.auth.user.user_name !==
                                'Laurence' && (
                                <span
                                  data-aos="zoom-in"
                                  data-aos-duration="3000"
                                  className="button is-primary is-rounded is-pulled-right"
                                  id={suggestion.status}
                                >
                                  {suggestion.status == 'completed'
                                    ? 'Completed'
                                    : suggestion.status == 'consideration'
                                    ? 'Under Consideration'
                                    : 'In Progress'}
                                </span>
                              )}
                              {/* Laurence should have a selector to pick the right status */}
                              {this.props.auth.user.user_name ===
                                'Laurence' && (
                                <span>
                                  Status: {suggestion.status}
                                  <select
                                    onChange={e =>
                                      this.handleStatusUpdate(e, suggestion.id)
                                    }
                                  >
                                    <option>Pick a new status</option>
                                    <option name="completed">Completed</option>
                                    <option name="consideration">
                                      Under Consideration
                                    </option>
                                    <option name="progress">In Progress</option>
                                  </select>
                                </span>
                              )}
                              <br />
                              <div id="desc">{suggestion.description}</div>
                            </p>
                          </div>
                          <nav className="level is-mobile">
                            <div className="level-left">
                              <a
                                onClick={e =>
                                  this.handleComment(suggestion.id, e)
                                }
                                id="secondIcon"
                                name={suggestion.id}
                                className="level-item"
                              >
                                <span className="icon is-medium tooltip">
                                  <span className="tooltiptext">
                                    Add Comment
                                  </span>
                                  <i className="fas fa-reply " />
                                </span>
                              </a>
                              <a
                                onClick={e => this.handleLike(suggestion.id, e)}
                                id="secondIcon"
                                name={suggestion.id}
                                className="level-item"
                              >
                                <span className="icon is-medium tooltip">
                                  <span className="tooltiptext">Add Vote</span>
                                  <i id="like" className="fas fa-heart" />
                                  <strong id="votes">{suggestion.votes}</strong>
                                </span>
                              </a>
                              <a
                                onClick={e =>
                                  this.toggleComments(suggestion.id, e)
                                }
                                id="secondIcon"
                                name={suggestion.id}
                                className="level-item"
                              >
                                <span className="icon is-medium tooltip">
                                  <span className="tooltiptext">
                                    All Comments
                                  </span>
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
                            {this.state.userComment !== '' && (
                              <nav className="level">
                                <div className="level-left">
                                  <div className="level-item">
                                    <a
                                      onClick={this.submitComment}
                                      className="button is-link"
                                      id="commentBtn"
                                    >
                                      Submit
                                    </a>
                                  </div>
                                </div>
                              </nav>
                            )}
                          </div>
                        </article>
                      )}

                      {this.state.showComment &&
                        this.state.id == suggestion.id &&
                        this.props.suggestions.comments &&
                        this.props.suggestions.comments.map(comment => {
                          if (comment.id === this.state.id) {
                            return (
                              <article
                                id="commentList"
                                className="message is-success"
                              >
                                <div className="message-header">
                                  <p id="commentHead">
                                    Posted by: <b>{comment.user}</b>
                                  </p>
                                </div>
                                <div className="message-body">
                                  <i>{comment.comment}</i>
                                </div>
                              </article>
                            );
                          }
                        })}
                      {this.state.showComment &&
                        this.state.id == suggestion.id && (
                          <a id="topLink" href="#">
                            Top
                          </a>
                        )}
                    </div>
                  );
                }
              } else {
                return (
                  <div
                    data-aos="zoom-in"
                    data-aos-duration="6000"
                    key={suggestion.id}
                  >
                    <article id="rowIdea" key={suggestion.id} className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <img src={`/${suggestion.category}.png`} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong id="ideaTitle">{suggestion.title}</strong>{' '}
                            {/* Remove the statuses for Laurence */}
                            {this.props.auth.user.user_name !== 'Laurence' && (
                              <span
                                data-aos="zoom-in"
                                data-aos-duration="3000"
                                className="button is-primary is-rounded is-pulled-right"
                                id={suggestion.status}
                              >
                                {suggestion.status == 'completed'
                                  ? 'Completed'
                                  : suggestion.status == 'consideration'
                                  ? 'Under Consideration'
                                  : 'In Progress'}
                              </span>
                            )}
                            {/* Laurence should have a selector to pick the right status */}
                            {this.props.auth.user.user_name === 'Laurence' && (
                              <span>
                                Status: {suggestion.status}
                                <select
                                  onChange={e =>
                                    this.handleStatusUpdate(e, suggestion.id)
                                  }
                                >
                                  <option>Pick a new status</option>
                                  <option name="completed">Completed</option>
                                  <option name="consideration">
                                    Under Consideration
                                  </option>
                                  <option name="progress">In Progress</option>
                                </select>
                              </span>
                            )}
                            <br />
                            <div id="desc">{suggestion.description}</div>
                          </p>
                        </div>
                        <nav className="level is-mobile">
                          <div className="level-left">
                            <a
                              onClick={e =>
                                this.handleComment(suggestion.id, e)
                              }
                              id="secondIcon"
                              name={suggestion.id}
                              className="level-item"
                            >
                              <span className="icon is-medium tooltip">
                                <span className="tooltiptext">Add Comment</span>
                                <i className="fas fa-reply " />
                              </span>
                            </a>
                            <a
                              onClick={e => this.handleLike(suggestion.id, e)}
                              id="secondIcon"
                              name={suggestion.id}
                              className="level-item"
                            >
                              <span className="icon is-medium tooltip">
                                <span className="tooltiptext">Add Vote</span>
                                <i id="like" className="fas fa-heart" />
                                <strong id="votes">{suggestion.votes}</strong>
                              </span>
                            </a>
                            <a
                              onClick={e =>
                                this.toggleComments(suggestion.id, e)
                              }
                              id="secondIcon"
                              name={suggestion.id}
                              className="level-item"
                            >
                              <span className="icon is-medium tooltip">
                                <span className="tooltiptext">
                                  All Comments
                                </span>
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
                          {this.state.userComment !== '' && (
                            <nav className="level">
                              <div className="level-left">
                                <div className="level-item">
                                  <a
                                    onClick={this.submitComment}
                                    className="button is-link"
                                    id="commentBtn"
                                  >
                                    Submit
                                  </a>
                                </div>
                              </div>
                            </nav>
                          )}
                        </div>
                      </article>
                    )}

                    {this.state.showComment &&
                      this.state.id == suggestion.id &&
                      this.props.suggestions.comments &&
                      this.props.suggestions.comments.map(comment => {
                        if (comment.id === this.state.id) {
                          return (
                            <article
                              id="commentList"
                              className="message is-success"
                            >
                              <div className="message-header">
                                <p id="commentHead">
                                  Posted by: <b>{comment.user}</b>
                                </p>
                              </div>
                              <div className="message-body">
                                <i>{comment.comment}</i>
                              </div>
                            </article>
                          );
                        }
                      })}
                    {this.state.showComment && this.state.id == suggestion.id && (
                      <a id="topLink" href="#">
                        Top
                      </a>
                    )}
                  </div>
                );
              }
            }
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
    upVote: (id, name) => {
      dispatch(upVoteAction(id, name));
    },
    addComment: (comment, id, name) => {
      dispatch(addCommentAction(comment, id, name));
    },
    getComments: () => {
      dispatch(getCommentsAction());
    },
    updateStatus: (status, id) => {
      dispatch(updateStatusAction(status, id));
    },
    filterIdeas: category => {
      dispatch(filterIdeasAction(category));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
