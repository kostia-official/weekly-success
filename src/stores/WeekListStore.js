import Alt from '../services/alt';

import WeekListAction from '../actions/WeekListAction';

class WeekListStore {

  constructor() {
    this.bindActions(WeekListAction);
  }

  onGetAll(weekList) {
    this.weekList = weekList;
  }

}

export default Alt.createStore(WeekListStore, 'WeekListStore');
