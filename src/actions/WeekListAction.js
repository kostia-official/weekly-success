import Alt from '../services/alt';
import WeekHelper from '../services/WeekHelper';

import ls from 'local-storage';
import _ from 'lodash';
import moment from 'moment';
import steed from 'steed';

import CategoriesAction from './CategoriesAction'
import TaskAction from './TaskAction'

class WeekListAction {

  constructor() {
    this.generateActions(
    );
  }

  getAll() {
    return (dispatch) => {
      var weekList = ls.get('weekList') || [];
      weekList = _.sortByOrder(weekList, week => week.date, false);

      var latestWeekDate = _.get(weekList, '[0].date');
      if (latestWeekDate && WeekHelper.isCurrentWeek(latestWeekDate)) return dispatch(weekList);

      CategoriesAction.getAll()((categories) => {
        this.add({tasks: categories});
        dispatch(ls.get('weekList'));
      });
    };
  }

  add(week) {
    return (dispatch) => {
      var newWeek = Object.assign({
        date: WeekHelper.getWeekStart(moment()),
        bonus: 0,
        skip: 0
      }, week);

      newWeek.tasks = _.map(newWeek.tasks, (task) => Object.assign({
        bonus: 0,
        skip: 0
      }, task));

      var weekList = ls.get('weekList') || [];
      weekList.push(newWeek);
      ls.set('weekList', weekList);
      dispatch(newWeek);
    };
  }

}

Alt.createActions(WeekListAction, exports);
