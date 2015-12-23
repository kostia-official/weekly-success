import React, { Component } from 'react';
import { RaisedButton } from 'material-ui/lib';

import ProfileStore from '../stores/ProfileStore';
import ProfileAction from '../actions/ProfileAction';

var logo = require('../assets/logo.png');

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ProfileStore.listen(state => this.setState(state));
  }

  componentWillUnmount() {
    ProfileStore.unlisten(state => this.setState(state));
  }

  render() {
    return (
      <div className="fully-center">
        <img className="logo" src={logo}/>
        <RaisedButton
          label="Login with DropBox"
          secondary={true}
          onClick={ProfileAction.login}
        />
      </div>
    );
  }
};
