import Alt from '../services/alt';
var ls = require('local-storage');

class TaskAction {

  constructor() {
    this.generateActions(
      ''
    );
  }

  add(task) {
    return (dispatch) => {
      var newTask = Object.assign({
        bonus: 0,
        skip: 0
      }, task);

      var tasks = ls.get('tasks') || [];
      tasks.push(newTask);
      ls.set('weekList', tasks);
      dispatch(newTask);
    };
  }

}

Alt.createActions(TaskAction, exports);
