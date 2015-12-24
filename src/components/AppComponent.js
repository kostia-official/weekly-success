import React, { Component, PropTypes } from 'react';
import { AppBar, TextField, FlatButton } from 'material-ui/lib';
import _ from 'lodash';

import ProfileAction from '../actions/ProfileAction';
import ProfileStore from '../stores/ProfileStore';

import LoginComponent from '../components/LoginComponent';
import WeekListComponent from '../components/WeekListComponent';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    profile: {},
    categories: []
  };

  componentWillMount() {
    ProfileStore.listen(state => this.setState(state));
    ProfileAction.authResolve();
  }

  componentWillUnmount() {
    ProfileStore.unlisten(state => this.setState(state));
  }

  getPoints = () => {
    return _.get(this.state, 'profile.points', 0);
  };

  render() {
    if (!this.state.isLoggedIn) return <LoginComponent />;

    return (
      <div>
        <AppBar
          title={<span>Weeker</span>}
          iconElementRight={<FlatButton onClick={ProfileAction.addPoint.bind(this, this.getPoints())}
          label={'Points: ' +  this.getPoints()}/>}
        />
        <WeekListComponent />
      </div>
    );
  }
};
