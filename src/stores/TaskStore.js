import Alt from '../services/alt';

import TaskAction from '../actions/TaskAction';

class TaskStore {

  constructor() {
    this.bindActions(TaskAction);
  }

}

export default Alt.createStore(TaskStore, 'TaskStore');
