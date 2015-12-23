import React, { Component } from 'react';
import Alt from '../services/alt';

import ProfileAction from '../actions/ProfileAction';

class ProfileStore {

  constructor() {
    this.bindActions(ProfileAction);
  }

  onAuthSuccess(profile) {
    this.isLoggedIn = true;
    this.profile = profile;
  }

  onAuthError(err) {
    this.isLoggedIn = false;
  }

  onGetProfile(profile) {
    this.profile = profile;
  }

  onAddPoint(points) {
    this.profile.points = points;
  }

}

export default Alt.createStore(ProfileStore, 'ProfileStore');
