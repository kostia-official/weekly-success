import React, { Component } from 'react';
import { AppBar, IconButton, List, TextField, FlatButton } from 'material-ui/lib';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import _ from 'lodash';

import ProfileStore from '../stores/ProfileStore';
import ProfileAction from '../actions/ProfileAction';
import LoginComponent from '../components/LoginComponent';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    profile: {}
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
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={<FlatButton onClick={ProfileAction.addPoint.bind(this, this.getPoints())}
          label={'Points: ' +  this.getPoints()}/>}
        />
        <List className="tasks-list">
          <TextField
            hintText="Hint Text (MultiLine)"
            multiLine={true}
            fullWidth={true}
          />
        </List>
      </div>
    );
  }
};
