import Alt from '../services/alt';

import WeekAction from '../actions/WeekAction';

class WeekStore {

  constructor() {
    this.bindActions(WeekAction);
  }

}

export default Alt.createStore(WeekStore, 'WeekStore');
