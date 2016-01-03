
'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import Intro from './components/intro.jsx'
import Challenge from './components/challenge.jsx'
import PageNotFound from './components/errorPage.jsx'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'

//Target element to render the components
let target = document.getElementById('main-container');

let Header = React.createClass({
  render() {
    return (
      <div className="header">
        <h1> {'<front end logos/>'} </h1>
        <h2> {'How many can you identify?'} </h2>
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
        <footer>Made by <a href="http://aarjithn.github.io">aarjithn</a> in an X'mas week off</footer>
      </div>
    )
  }
});

//Render the components
ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Intro} />
      <Route path="intro" component={Intro} />
      <Route path="challenge" component={Challenge} />
      <Route path="*" component={PageNotFound}/>
    </Route>
  </Router>

  , target);
