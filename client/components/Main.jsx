import React from "react";
import { connect } from "react-redux";

import {
  getSuggestionAction,
  upVoteAction,
  updateStatusAction,
  filterIdeasAction,
  deleteIdeaAction
} from "../actions/suggestions";
import {
  addCommentAction,
  getCommentsAction,
  deleteCommentAction
} from "../actions/comments";

import AddPage from "./AddPage";
import TopBar from "./TopBar";
import MainChildWrapper from "./MainChildWrapper";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPage: false,
      id: "",
      comment: false,
      userComment: "",
      showComment: false,
      commentData: [] || suggestions.comments,
      dropdown: "dropdown",
      filter: "",
      category: "all",
      dropdownCat: "dropdown",
      adminComment: [],
      searchEntry: "",
      filterActive: "Filter Status",
      categoryAction: "Category",
      confirmDelete: 0,
      itemToDelete: ""
    };
    [
      "togglePage",
      "handleComment",
      "handleLike",
      "submitComment",
      "handleCommentEntry",
      "toggleComments",
      "handleStatusUpdate",
      "toggleDrop",
      "filterIdeas",
      "toggleDropCat",
      "changeCategory",
      "searchEntry",
      "deleteIdea",
      "handleDeleteComment"
    ].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidMount() {
    this.props.getBoth();
  }

  togglePage() {
    this.setState({
      addPage: !this.state.addPage
    });
  }

  handleDeleteComment(data) {
    console.log(data);
    this.props.deleteComment(data);
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
      alert("Please enter a suitable comment.");
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
      this.props.getBoth();
    }
  }

  toggleComments(id, e) {
    e.preventDefault();
    this.props.suggestions.comments.map(comment => {
      if (comment.id === id && comment.user === "Laurence") {
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
    let formattedText = "";
    if (e.target.value === "Under Consideration") {
      formattedText = "consideration";
    } else if (e.target.value === "Completed") {
      formattedText = "completed";
    } else if (e.target.value === "Closed") {
      formattedText = "closed";
    } else {
      formattedText = "progress";
    }
    this.props.updateStatus(formattedText, id);
  }

  toggleDrop() {
    this.state.dropdown === "dropdown"
      ? this.setState({
          dropdown: "dropdown is-active"
        })
      : this.setState({
          dropdown: "dropdown"
        });
  }

  toggleDropCat() {
    this.state.dropdownCat === "dropdown"
      ? this.setState({
          dropdownCat: "dropdown is-active"
        })
      : this.setState({
          dropdownCat: "dropdown"
        });
  }

  filterIdeas(e) {
    if (e.target.name === "") {
      this.setState({
        dropdown: "dropdown",
        filterActive: "Filter Status"
      });
      this.props.getBoth();
    } else {
      this.setState({
        dropdown: "dropdown",
        filterActive:
          e.target.name === "consideration"
            ? "Under Consideration"
            : e.target.name === "completed"
            ? "Completed"
            : "In Progress"
      });
      this.props.filterIdeas(e.target.name);
    }
  }

  changeCategory(e) {
    this.setState({
      dropdownCat: "dropdown",
      category: e.target.name,
      categoryAction:
        e.target.name === "idea"
          ? "New Ideas"
          : e.target.name === "improvement"
          ? "Process Updates"
          : e.target.name === "team"
          ? "Team Improvements"
          : "Category"
    });
  }

  searchEntry(e) {
    this.setState({
      searchEntry: e.target.value
    });
  }

  deleteIdea(id) {
    if (this.state.confirmDelete === 1 && id === this.state.itemToDelete) {
      this.props.deleteIdea(id);
      this.setState({
        confirmDelete: 0,
        itemToDelete: ""
      });
    } else {
      this.setState({
        confirmDelete: 1,
        itemToDelete: id
      });
    }
  }

  render() {
    const suggestions = this.props.suggestions.suggestion;

    suggestions
      ? suggestions.sort((a, b) => b.votes - a.votes)
      : suggestions == suggestions;

    return (
      <div id="main" className="container">
        {!this.state.addPage && (
          <TopBar
            dropdown={this.state.dropdown}
            toggleDrop={this.toggleDrop}
            filterActive={this.state.filterActive}
            filterIdeas={this.filterIdeas}
            dropdownCat={this.state.dropdownCat}
            toggleDropCat={this.toggleDropCat}
            categoryAction={this.state.categoryAction}
            changeCategory={this.changeCategory}
            togglePage={this.togglePage}
            searchEntry={this.searchEntry}
            liked={this.props.suggestions.liked}
            commented={this.props.suggestions.commented}
          />
        )}
        {suggestions.length === 0 ? <p>No results</p> : null}
        {this.props.suggestions.suggestion &&
          !this.state.addPage &&
          suggestions.map(suggestion => {
            if (this.state.category === "all") {
              if (this.state.searchEntry !== "") {
                if (
                  suggestion.title
                    .toLowerCase()
                    .includes(this.state.searchEntry.toLowerCase()) ||
                  suggestion.description
                    .toLowerCase()
                    .includes(this.state.searchEntry.toLowerCase())
                ) {
                  return (
                    <MainChildWrapper
                      deleteComment={this.handleDeleteComment}
                      handleStatusUpdate={this.handleStatusUpdate}
                      deleteIdea={this.deleteIdea}
                      confirmDelete={this.state.confirmDelete}
                      itemToDelete={this.state.itemToDelete}
                      adminComment={this.state.adminComment}
                      handleComment={this.handleComment}
                      handleLike={this.handleLike}
                      toggleComments={this.toggleComments}
                      username={this.props.auth.user.user_name}
                      suggestion={suggestion}
                      stateComment={this.state.comment}
                      stateid={this.state.id}
                      handleCommentEntry={this.handleCommentEntry}
                      submitComment={this.submitComment}
                      userComment={this.state.userComment}
                      showComment={this.state.showComment}
                      commentProps={this.props.suggestions.comments}
                    />
                  );
                }
              } else {
                return (
                  <MainChildWrapper
                    deleteComment={this.handleDeleteComment}
                    handleStatusUpdate={this.handleStatusUpdate}
                    deleteIdea={this.deleteIdea}
                    confirmDelete={this.state.confirmDelete}
                    itemToDelete={this.state.itemToDelete}
                    adminComment={this.state.adminComment}
                    handleComment={this.handleComment}
                    handleLike={this.handleLike}
                    toggleComments={this.toggleComments}
                    username={this.props.auth.user.user_name}
                    suggestion={suggestion}
                    stateComment={this.state.comment}
                    stateid={this.state.id}
                    handleCommentEntry={this.handleCommentEntry}
                    submitComment={this.submitComment}
                    userComment={this.state.userComment}
                    showComment={this.state.showComment}
                    commentProps={this.props.suggestions.comments}
                  />
                );
              }
            } else if (suggestion.category === this.state.category) {
              if (this.state.searchEntry !== "") {
                if (
                  suggestion.title
                    .toLowerCase()
                    .includes(this.state.searchEntry.toLowerCase()) ||
                  suggestion.description
                    .toLowerCase()
                    .includes(this.state.searchEntry.toLowerCase())
                ) {
                  return (
                    <MainChildWrapper
                      handleStatusUpdate={this.handleStatusUpdate}
                      deleteComment={this.handleDeleteComment}
                      deleteIdea={this.deleteIdea}
                      confirmDelete={this.state.confirmDelete}
                      itemToDelete={this.state.itemToDelete}
                      adminComment={this.state.adminComment}
                      handleComment={this.handleComment}
                      handleLike={this.handleLike}
                      toggleComments={this.toggleComments}
                      username={this.props.auth.user.user_name}
                      suggestion={suggestion}
                      stateComment={this.state.comment}
                      stateid={this.state.id}
                      handleCommentEntry={this.handleCommentEntry}
                      submitComment={this.submitComment}
                      userComment={this.state.userComment}
                      showComment={this.state.showComment}
                      commentProps={this.props.suggestions.comments}
                    />
                  );
                }
              } else {
                return (
                  <MainChildWrapper
                    deleteComment={this.handleDeleteComment}
                    handleStatusUpdate={this.handleStatusUpdate}
                    deleteIdea={this.deleteIdea}
                    confirmDelete={this.state.confirmDelete}
                    itemToDelete={this.state.itemToDelete}
                    adminComment={this.state.adminComment}
                    handleComment={this.handleComment}
                    handleLike={this.handleLike}
                    toggleComments={this.toggleComments}
                    username={this.props.auth.user.user_name}
                    suggestion={suggestion}
                    stateComment={this.state.comment}
                    stateid={this.state.id}
                    handleCommentEntry={this.handleCommentEntry}
                    submitComment={this.submitComment}
                    userComment={this.state.userComment}
                    showComment={this.state.showComment}
                    commentProps={this.props.suggestions.comments}
                  />
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
    },
    deleteIdea: id => {
      dispatch(deleteIdeaAction(id));
    },
    getBoth: () => {
      dispatch(getSuggestionAction());
      dispatch(getCommentsAction());
    },
    deleteComment: data => {
      dispatch(deleteCommentAction(data));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
