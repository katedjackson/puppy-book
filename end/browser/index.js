'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AllPuppiesContainer from './components/all-puppies/AllPuppiesContainer';
import SinglePuppyContainer from './components/single-puppy/SinglePuppyContainer';
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { loadPuppies, loadOnePuppy } from './action-creators';


const onPuppiesEnter = function () {
  const thunk = loadPuppies();
  store.dispatch(thunk);
};

const onSinglePuppyEnter = function (nextRouterState) {
  const puppyId = nextRouterState.params.puppyId;
  const thunk = loadOnePuppy(puppyId);
  store.dispatch(thunk);
};

ReactDOM.render(
  <Provider store={store}>
    <div className="container flexbox-container">
      <div className="jumbotron">
        <Router history={hashHistory}>
          <Route path="/">
            <Route path="puppies" component={AllPuppiesContainer} onEnter={onPuppiesEnter} />
            <Route path="puppies/:puppyId" component={SinglePuppyContainer} onEnter={onSinglePuppyEnter} />
            <IndexRoute component={AllPuppiesContainer} onEnter={onPuppiesEnter} />
          </Route>
        </Router>
      </div>
    </div>
  </Provider>,
  document.getElementById('app')
);