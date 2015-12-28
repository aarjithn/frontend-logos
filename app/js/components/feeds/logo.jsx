'use strict';

import React from 'react';

const Logo = React.createClass({

  getLink () {
      return 'images/logos/' + this.props.img + '.png';
  },

  imageLoaded () {
      this.props.onLoaded();
  },

  render() {
    return (
      <div className="logo">
        <img src={this.getLink()} onLoad={this.imageLoaded}/>
      </div>
    );
  }
});

module.exports = Logo;