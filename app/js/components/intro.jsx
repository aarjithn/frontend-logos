'use strict';

import React from 'react';
import Spinner from './spinner.jsx';
import { Link } from 'react-router';

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
          <p>Front end landscape is ever changing. It could be pretty hard to keep up with the latest and greatest. </p>
          <p>Take the quiz to check how many you can identify. </p>
          <br/>
          <p>---------------<b>How to</b>---------------</p>
          <p>Enter the <b>npm package name</b> of the library/tool in the logo. </p>
          <p>Leave blank if unknown. </p>
          <Link className="btn" to={'/challenge'}>Start</Link>
        </div>

      </div>
    )
  }
});

module.exports = Intro;
