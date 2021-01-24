import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import UserFeed from './User';
import { fetchSession, destroySession, fetchFeed, postTweet, delTweet } from './utils';
import './Feed.scss';


const FeedLayout = (props) => {
  const user = props.user 
  const userId = props.userId
  const [ navLink, setNavLink ] = useState("/feed")
 // const [ navLocator, setNavLocator ] = useState(<Link className="nav-link nav-font" to={`/user/${userId}`} onClick={navBtnChg}>{user}</Link>)
  const [ menuKey, setMenuKey ] = useState(user)
  
  const submitLogout = () => {
    props.handleLogout()
  }
  
  const navBtnChg = (e) => {
    const pathname = window.location.pathname
    console.log(window.location.pathname)
    if (pathname === `/feed/user/${userId}`) {
      console.log('wkrs')
      setMenuKey({user})
      window.location.replace("/feed")
      return null
    } else {
      setMenuKey("Feed")
      window.location.replace(`/feed/user/${userId}`)
      return null
    }
  }

  return (
    <nav className="navbar">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            Logo<i className="fa fa-twitter"></i>
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
        <div className="nav navbar-nav btn-group dropdown">
          <a href="#" className="dropdown-toggle mr-5" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{user}</span></a>
          <ul className="dropdown-menu dropdown-menu-right pl-2 mr-auto" id="navMenu" role="menu">
            <li><a id="log-out" href="#" onClick={navBtnChg}>{menuKey}</a></li>
            <li role="presentation" className="dropdown-divider"></li>
            <li className><a href="#">Lists</a></li>
            <li role="presentation" className="dropdown-divider"></li>
            <li ><a href="#">Help</a></li>
            <li role="presentation" className="dropdown-divider"></li>
            <li ><a href="#">Keyboard shortcuts</a></li>
            <li role="presentation" className="dropdown-divider"></li>
            <li><a href="#">Settings</a></li>
            <li role="presentation" className="dropdown-divider"></li>
            <li ><a id="log-out" href="#" onClick={submitLogout}>Log out</a></li>
          </ul>
        </div> 
  </nav>
  )
}


export const Feed = (props) => {
  const user = props.user
  const logout = props.logout
  const [ feedTweets, setFeedTweets ] = useState(null)
  const [ tweetData, setTweetData ] = useState(null)
  

  useEffect(() => {
    getFeed()
  }, [])


  const getFeed = async () => {
    const feedData = await fetchFeed()
    await setFeedTweets(feedData.tweets)
    await setTweetData(feedData.tweets)
  }

  const handleTweet = async (e) => {
    e.preventDefault()
    console.log("tweet: ", e.target[0].value)
    const data = { message: e.target[0].value }
    await postTweet(data)
    await getFeed()
  }

  const deleteTweet = async (e) => {
    e.preventDefault()
    console.log("tweet id: ", e.target.id)
     await delTweet(e.target.id)  
     await getFeed()
  }

  const FeedItem = (props) => {
    const user = props.user
    const message = props.message
    const messageId = props.messageId

    return (
            <div className="tweet col-xs-12" id={`user${userId}`}>
              <a className="tweet-username" href="#">{user}</a>
              <a className="ml-2 tweet-screenName" href="#">@{user}</a>
              <p className="">{message}</p>
              <button className="delete-tweet btn bg-primary text-light align-text-top" onClick={deleteTweet({messageId})}>Delete</button>
            </div>
        )
  }
  
  const loadTweets = () => {
    if (feedTweets) {    
      return feedTweets.map((tweet) => {
        return (
              <div className="tweet col-xs-12" id={`user${tweet.id}`}>
              <a className="tweet-username" href="#">{tweet.username}</a>
              <a className="ml-2 tweet-screenName" href="#">@{tweet.username}</a>
              <p className="">{tweet.message}</p>
              <button className="delete-tweet btn bg-primary text-light align-text-top" id={tweet.id} onClick={deleteTweet}>Delete</button>
            </div>)
      })
    } else {
      return <p>Loading</p>
    }


  }

  return (
    <Router>
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
              <form onSubmit={handleTweet}>
                <div className="col-xs-12 post-tweet-box" onSubmit>
                  <textarea type="text" className="form-control post-input" rows="3" placeholder="What's happening?"></textarea>
                  <div className="pull-right">
                    <label id="upload-image-btn" >Upload image</label>
                    <img className="d-none" id="image-preview" src="" alt="image preview" />
                    <input type="file" id="image-select" name="image" accept="image/*" />
                    <span className="post-char-counter">140</span>
                    <button className="btn btn-primary" id="post-tweet-btn">Tweet</button>
                  </div>
                </div>
              </form>
              <div className="feed">
                <Switch>
                  <Route path="/feed" exact render={loadTweets} />
                </Switch>
              </div>
            </div>
            <div className="col-xs-3 follow-suggest">
            </div>
          </div>
        </div> 
    </Router>
  )  
  
}

export const FeedApp = () => { 
  const [ user, setUser ] = useState("User")
  const [ userId, setUserId ] = useState(null)
  const [ isAuth, setIsAuth ] = useState(false)
  const [ loadFeed, setLoadFeed ] = useState(<small>Authenticating...</small>)
  const [ layoutKey, setLayoutKey ] = useState(0)

  useEffect(() => {
    authenticate()
  }, [])

  const handleLogout = async () => {
      await destroySession()
      await authenticate()
  }

  const NoAuth = () => {
    window.location.replace("/")
    return null
  }

  async function authenticate() {
    const session = await fetchSession()
    if (session.user) {
      await setUser(session.username)
      await setUserId(session.user.id)
      await console.log("Session user: ", session.user.id)
    }
    await (session.authenticated) ? setLoadFeed(<Feed user={session.username} userId={session.user.id} />) : setLoadFeed(<NoAuth />)
    await setIsAuth(session.authenticated)
    await setLayoutKey(1)
  }

  return ( 
  <Router>
    <FeedLayout key={layoutKey} user={user} userId={userId} handleLogout={handleLogout} />
      <Switch>
        <Route path="/feed" exact >{loadFeed}</Route>
        <Route path={`/feed/user/${userId}`} exact><UserFeed user={user} userId={userId} /></Route>
      </Switch>
  </Router>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <React.StrictMode>
        <FeedApp />
      </React.StrictMode>,
      document.getElementById('root')
    );
})
export default Feed