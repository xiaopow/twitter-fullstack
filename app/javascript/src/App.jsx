import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Layout from './Layout';
import Feed from './Feed';
import { useState } from 'react';
import { fetchLogin, fetchSignUp } from './utils'

import './index.scss';

const isAuth = (success) => {
    (success) ? console.log('true') : console.log("false")
}

const Home = (props) => { 
    const [ loggedIn, setLoggedIn ] = useState(false)
    
    const handleSignUp = (e) => {
        e.preventDefault()

        const url = 'api/users'
        const method = 'POST'
        const data = { 
            user: {
                username: e.target[0].value,
                password: e.target[2].value,
                email: e.target[1].value
                }
            }
        fetchSignUp(method, url, data)
    }    

    async function handleLogin(e) {
        e.preventDefault()
        console.log("login target: ", e.target[0].value)
        console.log("login PWD: ", e.target[1].value)
    
        const url = 'api/sessions'
        const method = 'POST'
        const data = { 
            user: {
                username: e.target[0].value,
                password: e.target[1].value,
                }
            }
        const success = await fetchLogin(method, url, data);
        await props.changeLoginStatus(success, e.target[0].value)
    };

    return ( 
            <div className="main bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="front-card col-xs-10 col-xs-offset-1">
                            <div className="col-xs-6 welcome">
                                <div id="welcome-text">
                                    <h1><strong>Welcome to Twitter.</strong></h1>
                                    <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                                </div>
                                <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
                                <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br/>3:20 PM - 15 December 2016</a></p>
                            </div>
                            <div className="log-in col-xs-4 col-xs-offset-1">
                                <form onSubmit={handleLogin} >
                                    <div className="form-group">
                                    <input type="text" className="form-control username" placeholder="Username" />
                                    </div>
                                    <div className="form-group col-xs-8">
                                    <input type="password" className="form-control password" placeholder="Password" />
                                    </div>
                                    <button id="log-in-btn" className="btn btn-default btn-primary col-xs-3 col-xs-offset-1">Log in</button>
                                    <label>
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                    <span> &#183; </span>
                                    </label>
                                    <a href="#">Forgot password?</a>
                                </form>
                            </div>
                            <div className="sign-up col-xs-4 col-xs-offset-1">
                                <form onSubmit={handleSignUp}>
                                    <div className="new-to-t">
                                    <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
                                    </div>
                                    <div className="form-group">
                                    <input type="text" className="form-control username" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                    <input type="email" className="form-control email" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                    <input type="password" className="form-control password" placeholder="Password" />
                                    </div>
                                    <button id="sign-up-btn" className="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const App = () => { 
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ user, setUser ] = useState("Tim")

    const loginCheck = async (status, username) => {
        await setUser(username)
        await setLoggedIn(status)
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {loggedIn ? <Redirect push to="/feed" /> : <Layout><Home changeLoginStatus={loginCheck}/></Layout>} 
                </Route>
                <Route path="/feed">
                    <Feed changeLoginStatus={loginCheck} user={user} />
                    
                </Route>
                <Route path="/*">
                    <Redirect push to="/" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App

//{loggedIn ? <Feed changeLoginStatus={loginCheck} /> : <Redirect push to="/" />} 