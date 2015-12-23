import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'nk-css-reset/index.css';
import './scss/style.scss';

injectTapEventPlugin();

ReactDOM.render(<AppComponent />, document.getElementById('root'));
