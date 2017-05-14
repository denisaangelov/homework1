import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class Home extends React.Component {
  render() {
    return (
      <h3>Posts</h3>
    );
  }
}

