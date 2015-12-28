
'use strict';

import React from 'react';
import Spinner from '../spinner.jsx';
import { Link } from 'react-router'

const pagination = 10;

const NewContent = React.createClass({

  getInitialState() {
    return {
      newStories: [],
      isLoading: true,
      isLoadingMore: false
    }
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
    this.getContentJson(0, pagination, false);
  },

  getContentJson(startIndex, pagination, isLoadingMore) {

    let sourceUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    
    $.get(sourceUrl, function (response) {
      
      if (response && response.length == 0) {
        this.hideLoader();
        return;
      }

      for(let i = startIndex; i <= pagination; i++) {
        if (i == pagination) {
          
          if(this.isMounted()) this.hideLoader();

          if (this.isMounted() && isLoadingMore) this.setState({ isLoadingMore: false });

          return false;
        }

        this.getContentData(response[i], pagination);
      }      

    }.bind(this));
  },

  getContentData(id) {

    let contentUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';

    $.get(contentUrl, function (response) {
      
      if (response.length == 0) {
        if (this.isMounted()) {
          this.hideLoader();
        }
        return;
      }

      let domain = response.url ? response.url.split(':')[1].split('//')[1].split('/')[0] : '';

      response.domain = domain;

      //this.setState({newStories : this.state.newStories.concat(response)});

    }.bind(this));
  },

  render() {
    var newStories = this.state.newStories.map((response, index) => {
      
      let searchQuery = 'https://www.google.co.in/search?q=' + response.title;
      
      return (
        <div key={index}>
          <div className="content">
            <a className="title" target="_blank" href={response.url}>{response.title} </a>
            
            <div className={response.domain ? 'domain': 'hide'}> (<a href={'http://' + response.domain} title="Domain">{response.domain}</a>)</div>
          
            <div className="bottom-content">
              <span>{response.score} {(response.score > 1) ? ' points' : ' point'} </span>
              <span>by  
                <Link onClick={this.changeMenu} className="author" to={'/user/' + response.by}>{response.by}</Link>
              </span>
              <a href={searchQuery} target="_blank" className="search-web"> | <span>web</span></a>
            </div>
          </div>
        </div>
      )
    }, this);

    return (
      <div className="content-container">
        <div className={this.state.isLoading ? '': 'hide'}>
          <Spinner />
        </div>
        
        <div className= {this.state.isLoading ? 'content intro hide': 'content intro'}>
          <p>Front end landscape is ever changing. </p>
          <p>Check your knowledge in tools. </p>
          <p>Enter the <em>npm package name</em> of the library/tool in the logo. </p>
          <Link className="btn" to={'/challenge'}>Start</Link>
        </div>

        {this.props.children}
        <div className={ this.state.isLoadingMore ? 'mtop50' : 'hide'}>
          <Spinner />
        </div>
      </div>
    )
  }
});

module.exports = NewContent;

