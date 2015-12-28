'use strict';

import React from 'react';
import Logo from './logo.jsx';

const Challenge = React.createClass({

  getInitialState() {
    var logos = ['0beee348c9090c80b0342ade91359470',
      '1ec9cb73f2aac4884b7014ca4a7d8789',
      '4acdf86ed4347bef17ba03414d54a686',
      '6d2d1edae5b66b6d6b515f2be931ca9c',
      '7a5fe2c75f77800ba51311697d98437e'
      // '9c2d772904fb26402be611815485cd47',
      // '38ebd8acddf11e20cbbb5061512eff22',
      // '79b763147b998b1fa068eb90d862f81e',
      // '80cb4fac9904dd67a2b91ba2ca60a02f',
      // '89af6fd7ac67eafbfe1b01cd9669a6df'
    ],
    img = logos.splice(Math.floor(Math.random() * logos.length), 1)[0];
    return {
      logos: logos,
      img: img,
      logoReady: false,
      answers: [],
      score: ''
    }
  },
  
  evaluate(request) {
    let url = 'https://feechallenge-aarjithn.rhcloud.com/evaluate';

    $.post(url, {qas: request}, function(response) {
      this.setState({score: response.length})
    }.bind(this));
  },

  goTo(e) {
    var logos = this.state.logos;
    var nextLogo = logos.splice(Math.floor(Math.random() * logos.length), 1)[0];
    this.setState({logos: logos});

    var answers = this.state.answers.concat([{q:this.state.img, a:this.refs.inputVal.value}]);
    this.setState({answers: answers});
    console.log(answers);
    if(this.state.logos.length === 0) {
      this.evaluate(answers);
    } else {
      this.setState({img: nextLogo});
      this.setState({logoReady: false});

      this.refs.inputVal.value = "";
      this.refs.inputVal.focus();
    }

    e.preventDefault();
  },

  logoLoaded() {
    this.setState({logoReady: true});
  },

  render() {
    return (
    	<div className="content-container">
      	<div className={ this.state.score === '' ? 'content' : 'hide'}>
          <Logo img={this.state.img} onLoaded={this.logoLoaded}/>
          <form onSubmit={this.goTo}>
            <input type="text" ref="inputVal" autofocus/>
            <button type="submit" className="btn" disabled={!this.state.logoReady}>
            <span className={!this.state.logoReady ? 'hide' : ''}>Next</span>
            <span className={this.state.logoReady ? 'hide' : ''}>Loading</span>
          </button>
          </form>
	     	</div>
        <div className={ this.state.score === '' ? 'hide' : 'content'}>
          <h2>Your score is {this.state.score}</h2>
        </div>
      </div>
    );
  }
});

module.exports = Challenge;