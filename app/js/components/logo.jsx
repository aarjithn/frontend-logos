'use strict';

import React from 'react';

const Logo = React.createClass({

  getLink () {
    if(this.props.img) {
      return 'images/logos/' + this.props.img + '.png';
    } else {
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
    }
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
