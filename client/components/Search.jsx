import React from 'react';

const Search = props => {
  return (
    <div id="search" className="control has-icons-left has-icons-right">
      <input
        className="input"
        type="email"
        placeholder="Search here.."
        onChange={props.searchEntry}
      />
      <span className="icon is-small is-left">
        <i className="fas fa-search" />
      </span>
    </div>
  );
};

export default Search;
