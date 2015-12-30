'use strict';

import React from 'react';
import Spinner from '../spinner.jsx';
import Logo from './logo.jsx';

const Challenge = React.createClass({

  getInitialState() {
    return {
      logos: [],
      img: '',
      logoReady: false,
      isLoading: true,
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

 showLoader() {
    this.setState({
      isLoading: true
    });
  },

  hideLoader() {
    this.setState({
      isLoading: false
    });
  },

  componentDidMount() {
    this.getContentJson();
  },

  getContentJson() {

    let sourceUrl = 'images/logos/logos.json';

    $.get(sourceUrl, function (response) {

      if (response ) {
        var logos = response.logos;
        var img = logos.splice(Math.floor(Math.random() * logos.length), 1)[0];
        this.setState({logos, img});
        this.hideLoader();
        return;
      }

    }.bind(this));
  },

  goTo(e) {
    var logos = this.state.logos;
    var nextLogo = logos.splice(Math.floor(Math.random() * logos.length), 1)[0];
    this.setState({logos: logos});

    var answers = this.state.answers.concat([{q:this.state.img, a:this.refs.inputVal.value}]);
    this.setState({answers: answers});

    if(this.state.logos.length < 20) {
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
    	<div className="container">
            <div className={this.state.isLoading ? '': 'hide'}>
              <Spinner />
            </div>

            <div className={ this.state.score === '' && !this.state.isLoading ? 'content' : 'hide'}>
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
