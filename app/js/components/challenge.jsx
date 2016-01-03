'use strict';

import React from 'react';
import Spinner from './spinner.jsx';
import Logo from './logo.jsx';

const Challenge = React.createClass({

  getInitialState() {
    return {
      logos: [],
      isLoading: true,
      answers: [],
      score: '',
      response: ''
    }
  },

  evaluate(request) {
    let url = 'https://feechallenge-aarjithn.rhcloud.com/evaluate';

    $.post(url, {qas: request}, function(response) {
      this.setState({score: response.length, response: response.join(", ")})
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
        var logos = this.shuffle(response.logos, 15);
        this.setState({logos});
        this.hideLoader();
        return;
      }

    }.bind(this));
  },

  shuffle(array, len = array.length) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array.slice(0, len);
  },

  goTo(e) {
    var logos = this.state.logos;

    var answers = this.state.answers.concat([{q:this.state.logos[0], a:this.refs.inputVal.value}]);
    this.setState({answers: answers});

    if(this.state.logos.length === 1) {
      this.evaluate(answers);
    } else {
      this.showLoader();
      logos.shift();
      this.setState({logos});

      this.refs.inputVal.value = "";
      this.refs.inputVal.focus();
    }

    e.preventDefault();
  },

  retry() {
      this.replaceState(this.getInitialState());
      this.getContentJson();
      this.refs.inputVal.value = "";
  },

  render() {
    return (
    	<div className="container">
            <div className={ this.state.score === '' ? 'content' : 'hide'}>
                <div className={this.state.isLoading ? 'logo': 'hide'}>
                  <Spinner />
                </div>
                <div className={this.state.isLoading ? 'hide': ''}>
                  <Logo img={this.state.logos[0]} onLoaded={this.hideLoader}/>
                </div>
                <form onSubmit={this.goTo}>
                    <div className="controls">
                        <input type="text" ref="inputVal" placeholder="npm package name" autofocus/>
                        <button type="submit" className="next" disabled={this.state.isLoading}> > </button>
                        <div className="progress" style={{width: (100 - (this.state.logos.length * 100 / 15)) + "%"}}></div>
                        <span className="number">
                            <span className="number-current">{15 - this.state.logos.length + 1}</span>
                            <span className="number-total"> / 15</span>
                        </span>
                        <span className="error-message">hint: press enter to submit</span>
                    </div>
                </form>
            </div>

            <div className={ this.state.score === '' ? 'hide' : 'content'}>
              <div className="score">
                <h3 className="score-header">You Scored</h3>
                <h3><span className="score-perc">{Math.floor(this.state.score * 100 / 15)}</span><span className="score-sign">%</span></h3>
                <div className={ this.state.score == 0 ? 'hide' : ''}>
                    <p><i>You got these right:</i></p>
                    <p className="score-result">{this.state.response}</p>
                </div>
                <button className="btn" onClick={this.retry}>Retry</button>
              </div>
            </div>

      </div>
    );
  }
});

module.exports = Challenge;
