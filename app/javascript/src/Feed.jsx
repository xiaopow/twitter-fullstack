import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

import Layout from './Layout';
import './Feed.scss';


const FeedLayout = (props) => {
  const user = props.user 
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">
          <i className="fa fa-twitter"></i>
        </a>
      </div>
      <div className="search-bar col-xs-3 nav navbar-right ml-auto mr-4">
        <div className="input-group">
          <input type="text" className="form-control search-input" placeholder="Search for..."/>
          <span className="input-group-btn">
            <button className="btn btn-default search-btn border rounded-right border-left-0" type="button">Go!</button>
          </span>
        </div>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle mr-5" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{user}</span></a>
          <ul className="dropdown-menu row" role="menu">
            <li ><a href="#" className="username">User</a></li>
            <li role="presentation" className="divider"></li>
            <li ><a href="#">Lists</a></li>
            <li role="presentation" className="divider"></li>
            <li ><a href="#">Help</a></li>
            <li ><a href="#">Keyboard shortcuts</a></li>
            <li role="presentation" className="divider"></li>
            <li ><a href="#">Settings</a></li>
            <li ><a id="log-out" href="#">Log out</a></li>
          </ul>
        </li>
      </ul>
      
   
  </nav>
  )
}


export const Feed = (props) => {
  const user = props.user

  const feedItem = (
            <div className="tweet col-xs-12">
              <a className="tweet-username" href="#">{user}</a>
              <a className="ml-2 tweet-screenName" href="#">@{user}</a>
              <p className="">This is an amazing tweet</p>
              <button className="delete-tweet btn bg-primary text-light align-text-top">Delete</button>
            </div>
        )

  return (
    <>
   <FeedLayout user={user} />
    <div className="main container">
      <div className="row">
        <div className="col-xs-3 profile-trends">
          <div className="profileCard col-xs-12">
            <div className="profileCard-content">
              <div className="user-field col-xs-12">
                <a className="username" href="#">{user}</a><br/>
                <a className="screenName" href="#">@{user}</a>
              </div>
              <div className="user-stats">
                <div className="col-xs-3">
                  <a href="">
                    <span>Tweets<br/></span>
                    <span className="user-stats-tweets">10</span>
                  </a>
                </div>
                <div className="col-xs-4">
                  <a href="">
                    <span>Following<br/></span>
                    <span className="user-stats-following">0</span>
                  </a>
                </div>
                <div className="col-xs-4">
                  <a href="">
                    <span>Followers<br/></span>
                    <span className="user-stats-followers">0</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="trends col-xs-12">
            <div className="col-xs-12">
              <div className="trends-header">
                <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>
              </div>
              <ul className="trends-list">
                <li><a href="#">#Hongkong</a></li>
                <li><a href="#">#Ruby</a></li>
                <li><a href="#">#foobarbaz</a></li>
                <li><a href="#">#rails</a></li>
                <li><a href="#">#API</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-6 feed-box">
          <div className="col-xs-12 post-tweet-box">
            <textarea type="text" className="form-control post-input" rows="3" placeholder="What's happening?"></textarea>
            <div className="pull-right">
              <label id="upload-image-btn" >Upload image</label>
              <img className="d-none" id="image-preview" src="" alt="image preview" />
              <input type="file" id="image-select" name="image" accept="image/*" />
              <span className="post-char-counter">140</span>
              <button className="btn btn-primary" disabled id="post-tweet-btn">Tweet</button>
            </div>
          </div>
          <div className="feed">
            {feedItem}
          </div>
        </div>
        <div className="col-xs-3 follow-suggest">
        </div>
      </div>
    </div> 
    </>
  )  
}
export default Feed