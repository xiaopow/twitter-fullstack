import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { fetchLogin, fetchSignUp } from './utils';
import Layout from './Layout';



const Home = (props) => { 
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ failedLogin, setFailedLogin ] = useState(null)
  const [ signupSuccess, setSignupSuccess ] = useState(null)
  
  const handleSignUp = async (e) => {
    e.preventDefault()

    const data = { 
        user: {
            username: e.target[0].value,
            password: e.target[2].value,
            email: e.target[1].value
            }
        }
    const signup = await fetchSignUp(data)
    
    await (signup) ? setSignupSuccess(<div className="ml-3 mb-2 text-success"><small><i>Sign up successful. Please log in above.</i></small></div>) : setSignupSuccess(<div className="ml-3 mb-2 text-danger"><small><i>Sign up error. Please try again.</i></small></div>)
  }    

  async function handleLogin(e) {
      e.preventDefault()
      if ((e.target[0].value) && (e.target[1].value)) { 
        const data = { 
            user: {
                username: e.target[0].value,
                password: e.target[1].value,
                }
            }
        const success = await fetchLogin(data)
        await (success) ? props.changeLoginStatus(success, e.target[0].value) : setFailedLogin(<div className="ml-3 mb-2 text-danger"><small><i>The username and password you entered did not match our records. Please double-check and try again.</i></small></div>)
      }
    };


  return ( 
          <div className="main mt-0 bg-secondary">
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
                                  {failedLogin}
                                  <input type="text" className="form-control username" placeholder="Username" />
                                  </div>
                                  <div className="form-group col-xs-8">
                                  <input type="password" className="form-control password" placeholder="Password" />
                                  </div>
                                  <button id="log-in-btn" className="btn btn-default btn-primary col-xs-3 col-xs-offset-1 mr-2">Log in</button>
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
                                  {signupSuccess}
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

const HomeApp = () => { 
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ user, setUser ] = useState("Tim")

  const loginCheck = async (status, username) => {
      await setUser(username)
      await setLoggedIn(status)
  }

  const Login = () => {
    window.location.replace("/feed")
    return null
  }

  return (
    (loggedIn) ? <Login /> : <Layout><Home changeLoginStatus={loginCheck} /></Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <React.StrictMode>
          <HomeApp />
        </React.StrictMode>,
        document.getElementById('root')
      )
})

