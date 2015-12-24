import Alt from '../services/alt';

import CategoriesAction from '../actions/CategoriesAction';

class CategoriesStore {

  constructor() {
    this.bindActions(CategoriesAction);
  }

  onGetAll(categories) {
    this.categories = categories;
  }
}

export default Alt.createStore(CategoriesStore, 'CategoriesStore');
