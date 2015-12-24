import React, { Component, PropTypes } from 'react';
import { AppBar, IconButton, List, TextField, FlatButton } from 'material-ui/lib';
import _ from 'lodash';

import WeekComponent from '../actions/CategoriesAction';
import CategoriesStore from '../stores/CategoriesStore';

export default class TaskComponent extends Component {

  static propTypes = {
    task: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = this.props.task;
  }

  onChangeDescription = (e) => this.state.description = e.target.value;
  onChangeResult = (e) => this.state.result = e.target.value;

  render() {
    return (
      <div>
        <TextField
          floatingLabelText={_.capitalize(this.state.category)}
          multiLine={true}
          fullWidth={true}
          value={this.state.description}
          onChange={this.onChangeDescription}
        />
        <TextField
          hintText={'Result'}
          multiLine={true}
          fullWidth={true}
          value={this.state.result}
          onChange={this.onChangeResult}
        />
      </div>
    );
  }
};
