import React from 'react';
import { connect } from 'react-redux';
import { addSuggestionAction } from '../actions/suggestions';

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: 'none',
      user: '' || this.props.auth.user.user_name
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addSuggestion(this.state);
    this.props.togglePage();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h2 id="mainTitle" className="title is-2 has-text-centered">
          Add Improvement
        </h2>
        <p id="subAdd" className="subtitle">
          Add a new improvement to the main page below.
        </p>
        <hr />
        <form id="addForm" onSubmit={this.handleSubmit}>
          <label id="addTitle">Main Title</label>
          <br />
          <input
            id="formInput"
            name="title"
            onChange={this.handleChange}
            placeholder="Enter Title"
            className="input"
            type="text"
          />
          <br />
          <label id="addTitle">Description</label>
          <br />
          <input
            id="formInput"
            name="description"
            onChange={this.handleChange}
            placeholder="Enter Description"
            className="input"
            type="text"
          />
          <br />
          <label id="addTitle">Category</label>
          <br />
          <div id="formInput" className="field">
            <div className="control">
              <div className="select is-primary">
                <select name="category" onChange={this.handleChange}>
                  <option value="none">Pick a Category</option>
                  <option value="idea">New Ideas</option>
                  <option value="improvement">Process Updates</option>
                  <option value="team">Team Improvements</option>
                </select>
              </div>
            </div>
          </div>
          {this.state.category !== 'none' &&
            this.state.title !== '' &&
            this.state.description !== 'none' && (
              <input className="button is-link" type="submit" value="Submit" />
            )}
        </form>
        <button
          id="backBtn"
          className="tooltip button is-link"
          onClick={this.props.togglePage}
        >
          <i id="backIcon" className="fas fa-angle-left" /> Back
          <span className="tooltiptext">To homepage</span>
        </button>
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
    addSuggestion: data => {
      dispatch(addSuggestionAction(data));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPage);
