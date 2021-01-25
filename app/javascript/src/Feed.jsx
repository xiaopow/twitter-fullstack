import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory, NavLink } from "react-router-dom";

import UserFeed from './User';
import { fetchSession, destroySession, fetchFeed, postTweet, delTweet, fetchUserTweets } from './utils';
import './Feed.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

//
//const FeedLayout = (props) => {
//  const user = props.user 
//  const userId = props.userId
//  const [ navLink, setNavLink ] = useState(<Link to={`/feed/user/${userId}`} onClick={navBtnChg}>{user}</Link>)
// // const [ navLocator, setNavLocator ] = useState(<Link className="nav-link nav-font" to={`/user/${userId}`} onClick={navBtnChg}>{user}</Link>)
//  const [ menuKey, setMenuKey ] = useState(0)
//  
//  const submitLogout = () => {
//    props.handleLogout()
//  }
//
//  useEffect(() => {
//    navBtnChg()
//  }, [])
//
//
//  
//  const navBtnChg = (e) => {
//    
//    const pathname = window.location.pathname
//    console.log(window.location.pathname)
//    if (pathname === `/feed/user/${userId}`) {
//      return setNavLink(<Link to="/feed" onClick={navBtnChg}>Feed</Link>)
//      setMenuKey(menuKey + 1)
//      //console.log('wkrs')
//      //setMenuKey({user})
//      //window.location.replace("/feed")
//      //return null
//    } else {
//      return setNavLink(<Link to={`/feed/user/${userId}`} onClick={navBtnChg}>{user}</Link>)
//      setMenuKey(menuKey + 1)
//      //window.location.replace(`/feed/user/${userId}`)
//      //return null
//    }
//  }
//
// 
////<a id="log-out" href="#" onClick={navBtnChg}>{menuKey}</a>
//
//  return 
//}
//

export const Feed = (props) => {
  const user = props.user
  const userId = props.userId
  const logout = props.logout
  const isAuth = props.isAuth
  const [ feedTweets, setFeedTweets ] = useState(null)
  const [ tweetData, setTweetData ] = useState(null)
  const [ tweetCount, setTweetCount ] = useState(0)
  const [ userTweetData, setUserTweetData ] = useState(null)
  const [ userKey, setUserKey ] = useState(0)
   
  useEffect(() => {
    getFeed()
  }, [])


    const NavBar = (props) => {
      

      const search = (e) => {
        e.preventDefault()
        console.log("search")
      }

      return(
        <nav className="navbar">
          <div className="navbar-header">
          <Link className="navbar-brand" to="/feed" exact >
              <FontAwesomeIcon icon={faTwitter} />
          </Link>
          </div>
          <form className="search-bar col-xs-3 nav navbar-right ml-auto mr-4" onSubmit={search}>
            <div className="input-group border rounded" id="searchBox">
              <input type="text" className="form-control search-input" id="searchInput" placeholder="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-default search-btn" id="searchBtn">Go!</button>
              </span>
            </div>
          </form>
          <div className="nav navbar-nav btn-group dropdown">
            <a href="#" className="dropdown-toggle mr-5" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{user}</span></a>
            <ul className="dropdown-menu dropdown-menu-right pl-2 mr-auto" id="navMenu" role="menu">
              <NavLink to="/feed" exact activeClassName="d-none" ><li> All Tweets </li></NavLink>
              <NavLink to={{ pathname: `/feed/user/${userId}`, state: { user: props.user }}} activeClassName="d-none" ><li >{user}</li></NavLink>
              <li role="presentation" className="dropdown-divider"></li>
              <li disabled><a href="#">Lists</a></li>
              <li role="presentation" className="dropdown-divider"></li>
              <li disabled><a href="#">Help</a></li>
              <li role="presentation" className="dropdown-divider"></li>
              <li disabled><a href="#">Keyboard shortcuts</a></li>
              <li role="presentation" className="dropdown-divider"></li>
              <li disabled><a href="#">Settings</a></li>
              <li role="presentation" className="dropdown-divider"></li>
              <li ><a id="log-out" href="#" onClick={props.logout}>Log out</a></li>
            </ul>
          </div> 
        </nav>
     )    
    }

    const SideBar = () => {
      return (
        <div className="col-xs-3 profile-trends">
          <div className="profileCard col-xs-12">
            <div className="profileCard-content">
              <div className="user-field col-xs-12">
                <Link className="username" to={{ pathname: `/feed/user/${userId}`, state: { user: user }}}>{user}</Link><br/>
                <Link className="screenName" to={{ pathname: `/feed/user/${userId}`, state: { user: user }}}>@{user}</Link>
              </div>
              <div className="user-stats">
                <div className="col-xs-3">
                  <a href="">
                    <span>Tweets<br/></span>
                    <span className="user-stats-tweets">{tweetCount}</span>
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
                <li><a href="#" disabled>#Hongkong</a></li>
                <li><a href="#" disabled>#Ruby</a></li>
                <li><a href="#" disabled>#foobarbaz</a></li>
                <li><a href="#" disabled>#rails</a></li>
                <li><a href="#" disabled>#API</a></li>
              </ul>
            </div>
          </div>
        </div>
      )
    }

  const getFeed = async () => {
    const feedData = await fetchFeed()
    const userData = await fetchUserTweets(user)
    await setFeedTweets(feedData.tweets)
    await setTweetData(feedData.tweets)
    await setUserTweetData(userData.tweets)
    await setTweetCount(userData.tweets.length)
  }

  const handleTweet = async (e) => {
    e.preventDefault()
    console.log("tweet: ", e.target[0].value)
    const data = { message: e.target[0].value }
    e.target[0].value = null
    await postTweet(data)
    await getFeed()
  }

  const deleteTweet = async (e) => {
    e.preventDefault()
    console.log("tweet id: ", e.target.id)
     await delTweet(e.target.id)  
     await getFeed()
  }
  
  const loadTweets = () => {
    if (feedTweets) {    

      return feedTweets.map((tweet) => {
        let deleteButton = null

        if (user === tweet.username) {
          deleteButton = <button className="delete-tweet btn bg-primary text-light ml-auto mt-auto py-1" id={tweet.id} onClick={deleteTweet}>Delete</button>
        }

        return (
              <div className="tweet col-xs-12" key={`user${tweet.id}`}>
                <Link className="tweet-username" to={{ pathname: `/feed/user/${tweet.id}`, state: { user: tweet.username }}}>{tweet.username}</Link>
                <Link className="ml-2 tweet-screenName" to={{ pathname: `/feed/user/${tweet.id}`, state: { user: tweet.username }}}>@{tweet.username}</Link>
                <div className="d-flex"> 
                  <p className="pt-2">{tweet.message}</p>
                  {deleteButton}
                </div>
              </div>)
      })
    } else {
      return <p>Loading</p>
    }
  }

  return (
    <Router>
      <NavBar logout={props.logout} user={user} />
        <div className="main container">
          <div className="row">
            <SideBar />
            <div className="col-xs-6 feed-box">
              <form onSubmit={handleTweet}>
                <div className="col-xs-12 post-tweet-box">
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
                <Route path="/feed/user/:id" exact><UserFeed key={userKey} user={user} userId={userId} isAuth={isAuth} data={userTweetData} delete={deleteTweet} /></Route>
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


// MAIN COMPONENT FOR ALL-FEED and USER-FEED
export const FeedApp = () => { 
  const [ user, setUser ] = useState("User")
  const [ userId, setUserId ] = useState(null)
  const [ isAuth, setIsAuth ] = useState(false)
  const [ loadFeed, setLoadFeed ] = useState(<small>Authenticating...</small>)
  const [ layoutKey, setLayoutKey ] = useState(0)
  const [ navLink, setNavLink ] = useState(<Link to="/feed" onClick={test}>Feed</Link>)
  const locHist = useHistory();

  useEffect(() => {
    authenticate()
    console.log(locHist)
  }, [])

 // useEffect(() => {
 //   console.log(locHist.location.pathname)
 // }, [locHist.location.pathname])

  const test = (e) => {
    console.log('Link click: ', e)
  }

  const loadDropdown = () => {
  
  //  (e.currentTarget === "/feed") ? setNavLink(<Link to={`/feed/user/${userId}`} onChange={(e) => { console.log('Link click: ', e.currentTarget)}}>{user}</Link>) : setNavLink(<Link to="/feed" onChange={(e) => { console.log('Link click: ', e.currentTarget)}}>Feed</Link>)
    setLayoutKey(layoutKey + 1)
  }

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
     // await loadDropdown(session.username, session.user.id)
      await console.log("Session user: ", session.user.id)
    }
    await (session.authenticated) ? setLoadFeed(<Feed user={session.username} userId={session.user.id} isAuth={session.authenticated} logout={handleLogout} />) : setLoadFeed(<NoAuth />)
    await setIsAuth(session.authenticated)
  }

  


  return ( 
  <Router>
    {loadFeed}
  </Router>
  )
}


//RENDERER
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <React.StrictMode>
        <FeedApp />
      </React.StrictMode>,
      document.getElementById('root')
    );
})
export default Feed