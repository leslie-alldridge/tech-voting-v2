import React from 'react';
import { connect } from 'react-redux';
import { addSuggestionAction } from '../actions/suggestions';

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      category: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submitted');
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
        <form onSubmit={this.handleSubmit}>
          <label>Main Title</label>
          <input
            name="title"
            onChange={this.handleChange}
            placeholder="Enter Title"
            className="input"
            type="text"
          />
          <label>Description</label>
          <input
            name="description"
            onChange={this.handleChange}
            placeholder="Enter Description"
            className="input"
            type="text"
          />
          <label>Category</label>
          <div className="field">
            <div className="control">
              <div className="select is-primary">
                <select name="category" onChange={this.handleChange}>
                  <option>Pick a Category</option>
                  <option>New Ideas</option>
                  <option>Process Updates</option>
                  <option>Team Improvements</option>
                </select>
              </div>
            </div>
          </div>
          <input type="submit" value="submit" />
        </form>
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
)(AddPage);
