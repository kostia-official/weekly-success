import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText, CardActions, FlatButton } from 'material-ui/lib';
import _ from 'lodash';
import moment from 'moment';

import CategoriesAction from '../actions/CategoriesAction';
import CategoriesStore from '../stores/CategoriesStore';

import TaskComponent from '../components/TaskComponent';
import WeekHelper from '../services/WeekHelper';

export default class WeekComponent extends Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    latest: false
  };

  static propTypes = {
    latest: PropTypes.bool
  };

  state = {
    categories: []
  };

  componentWillMount() {
    CategoriesStore.listen(state => this.setState(state));
    CategoriesAction.getAll();
  }

  componentWillUnmount() {
    CategoriesStore.unlisten(state => this.setState(state));
  }

  render() {
    var weekTasksDom = _.map(this.state.categories, (task, i) => (
      <TaskComponent task={task} key={i}/>
    ));

    var {week} = this.props;

    return (
      <div className="week-card">
        <Card initiallyExpanded={this.props.latest}>
          <CardHeader
            title={<span>{WeekHelper.getWeekRange(week.date)}</span>}
            subtitle={<div>
            <div><span>Bonuses: {week.bonus} </span></div>
            <div><span> Skip: {week.skip}</span></div>
          </div>}
            actAsExpander={true}
            showExpandableButton={true}
            avatar={<div></div>}
          />
          <CardText expandable={true}>
            {weekTasksDom}
          </CardText>
        </Card>
      </div>
    );
  }
};
