'use strict';

import React from 'react';
import Spinner from './spinner.jsx';
import { Link } from 'react-router'

const Intro = React.createClass({

  getInitialState() {
    return {
      isLoading: false
    }
  },

  render() {
    return (
      <div className="content-container">
        <div className={this.state.isLoading ? '': 'hide'}>
          <Spinner />
        </div>

        <div className= {this.state.isLoading ? 'content intro hide': 'content intro'}>
          <p>Front end landscape is ever changing. </p>
          <p>Enter the <em>npm package name</em> of the library/tool in the logo. </p>
          <Link className="btn" to={'/challenge'}>Start</Link>
        </div>

      </div>
    )
  }
});

module.exports = Intro;
