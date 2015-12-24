import Alt from '../services/alt';
var ls = require('local-storage');

class WeekAction {

  constructor() {
    this.generateActions(
      ''
    );
  }

}

Alt.createActions(WeekAction, exports);
