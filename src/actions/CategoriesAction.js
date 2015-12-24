import Alt from '../services/alt';
var ls = require('local-storage');

const defaultCategories = [{category: 'personal'}, {category: 'relationship'}, {category: 'work'}];

class CategoriesAction {

  constructor() {
    this.generateActions(
      ''
    );
  }

  getAll() {
    return (dispatch) => {
      var categories = ls.get('categories');

      if (!categories) {
        categories = defaultCategories;
        ls.set('categories', categories);
      }

      dispatch(categories);
    };
  }

}

Alt.createActions(CategoriesAction, exports);
