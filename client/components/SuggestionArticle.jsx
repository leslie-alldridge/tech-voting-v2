import React, { Component } from "react";

import AdminStatusSelector from "./AdminStatusSelector";
import StatusPill from "./StatusPill";

class SuggestionArticle extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.commentsLoad(this.props.suggestion.id);
  };

  render() {
    return (
      <article id="rowIdea" key={this.props.suggestion.id} className="media">
        <figure id="articleImg" className="media-left">
          <p className="image is-64x64">
            <img
              id="articleImg"
              src={`/${this.props.suggestion.category}.png`}
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <strong id="ideaTitle">{this.props.suggestion.title}</strong>{" "}
            {/* Remove the statuses for Laurence */}
            {this.props.username !== "Laurence" && (
              <StatusPill suggestion={this.props.suggestion} />
            )}
            {/* Laurence should have a selector to pick the right status */}
            {this.props.username === "Laurence" && (
              <AdminStatusSelector
                suggestion={this.props.suggestion}
                handleStatusUpdate={this.props.handleStatusUpdate}
                deleteIdea={this.props.deleteIdea}
                confirmDelete={this.props.confirmDelete}
                itemToDelete={this.props.itemToDelete}
              />
            )}
            <br />
            <div id="desc">{this.props.suggestion.description}</div>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              {this.props.adminComment.includes(this.props.suggestion.id) && (
                <a
                  id="secondIcon"
                  name={this.props.suggestion.id}
                  className="level-item"
                >
                  <span className="icon is-medium tooltip">
                    <span className="tooltiptext">Admin Commented</span>
                    <i id="admin" className="fas fa-trophy" />{" "}
                  </span>
                </a>
              )}
              <a
                onClick={e =>
                  this.props.handleComment(this.props.suggestion.id, e)
                }
                id="secondIcon"
                name={this.props.suggestion.id}
                className="level-item"
              >
                <span className="icon is-medium tooltip">
                  <span className="tooltiptext">Add Comment</span>
                  <i className="fas fa-reply " />
                </span>
              </a>
              <a
                onClick={e =>
                  this.props.handleLike(this.props.suggestion.id, e)
                }
                id="secondIcon"
                name={this.props.suggestion.id}
                className="level-item"
              >
                <span className="icon is-medium tooltip">
                  <span className="tooltiptext">Add Vote</span>
                  <i id="like" className="fas fa-heart" />
                  <strong id="votes">{this.props.suggestion.votes}</strong>
                </span>
              </a>
              <a
                onClick={e =>
                  this.props.toggleComments(this.props.suggestion.id, e)
                }
                id="secondIcon"
                name={this.props.suggestion.id}
                className="level-item"
              >
                <span className="icon is-medium tooltip">
                  <span className="tooltiptext">All Comments</span>
                  <i id="like" className="fas fa-comments" />
                  <strong id="votes">
                    {this.props.suggestion.commentcount}
                  </strong>
                </span>
              </a>
            </div>
            <p>
              <i id="submittedBy">Submitted by:</i>{" "}
              <b id="submittedBy">{this.props.suggestion.user}</b>
            </p>
          </nav>
        </div>
      </article>
    );
  }
}

export default SuggestionArticle;
