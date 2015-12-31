
'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import NewContent from './components/feeds/newContent.jsx'
import Challenge from './components/feeds/challenge.jsx'
import PageNotFound from './components/errorPage.jsx'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'

//Target element to render the components
let target = document.getElementById('main-container');

let Header = React.createClass({
  render() {
    return (
      <div className="header">
        <h1> {'<Front End Logos/>'} </h1>
        <a href="https://twitter.com/share" className="twitter-share-button" data-hashtags="fe-logos">Tweet</a>
        <ul className="border-color">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
});

let App = React.createClass({
  render() {
    return (
      <div>
        <Header/>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

// let redirectToChild = (location, replaceState) => {
//   replaceState(null, '/new');
// }

//Render the components
ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={NewContent} />
      <Route path="new" component={NewContent} />
      <Route path="challenge" component={Challenge} />
      <Route path="*" component={PageNotFound}/>
    </Route>
  </Router>

  , target);
