import React, { Component } from 'react';
import { List } from 'material-ui/lib';

import _ from 'lodash';
import moment from 'moment';

import CategoriesAction from '../actions/CategoriesAction';
import CategoriesStore from '../stores/CategoriesStore';

import WeekListAction from '../actions/WeekListAction';
import WeekListStore from '../stores/WeekListStore';

import WeekComponent from '../components/WeekComponent';

export default class WeekListComponent extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    emptyWeek: null
  };

  componentWillMount() {
    WeekListStore.listen(state => this.setState(state));
    WeekListAction.getAll();
  }

  componentWillUnmount() {
    WeekListStore.unlisten(state => this.setState(state));
  }

  render() {
    var weeksDom = _.map(this.state.weekList, (week, i) => <WeekComponent latest={i === 0} week={week} key={i}/>);

    return (
      <List>
        {weeksDom}
      </List>
    );
  }
};
