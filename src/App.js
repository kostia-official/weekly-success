import React, { Component } from 'react';

export default class App extends Component {

  state = {
    text: 'Hello!'
  };

  render() {
    return <div>{this.state.text}</div>;
  }
};
