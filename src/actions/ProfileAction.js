import React, { Component } from 'react';
import Alt from '../services/alt';
var ls = require('local-storage');

class ProfileStore {

  constructor() {
    this.generateActions(
      'authSuccess',
      'authError'
    );
  }

  authResolve() {
    var currentUser = ls.get('currentUser');
    if (!currentUser) return this.authError();

    this.authSuccess(currentUser);
  }

  login() {
    var currentUser = {points: 0};
    ls.set('currentUser', currentUser);
    this.authSuccess(currentUser);
  }

  getProfile() {
    return ls.get('currentUser');
  }

  addPoint(points) {
    return (dispatch) => {
      dispatch(points + 1);

      var currentUser = ls.get('currentUser');

      currentUser.points = currentUser.points + 1 || 1;
      ls.set('currentUser', currentUser);
    };
  }

}

Alt.createActions(ProfileStore, exports);
