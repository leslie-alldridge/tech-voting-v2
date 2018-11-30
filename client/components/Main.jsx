import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>hello from main</p>;
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Main);
