import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchUserTweets } from './utils';


export const UserFeed = (props) => {
    const user = props.user
    const linkState = useHistory()
    const [ data, setData ] = useState(null)
    
    useEffect(() => {
        userData()
    }, [linkState.location.state.user]) // User Data is retrieved any time there is an update to the user


    // GET User Data
    const userData = async () => {
        if (linkState.location.state) {
            const username = linkState.location.state.user
            const userData = await fetchUserTweets(username)
            await setData(userData.tweets)
            await props.handleSideUser(username, linkState.location.state.id, userData.tweets.length) // Passing state for Side Bar update
        }
    }

    // Process User Feed
    const LoadUserFeed = () => {
        if (data) {
            const dataArr = data
            return dataArr.slice(0).reverse().map((tweet) => {
                let deleteButton = null

                if (user === tweet.username) {
                  deleteButton = <button className="delete-tweet btn bg-primary text-light ml-auto mt-auto py-1" id={tweet.id} onClick={props.delete}>Delete</button>
                }

                return (
                    <div className="tweet col-xs-12" key={tweet.id}>
                        <Link className="tweet-username" to={{ pathname: `/feed/user/${tweet.id}`, state: { user: tweet.username, id: tweet.id }}}>{tweet.username}</Link>
                        <Link className="ml-2 tweet-screenName" to={{ pathname: `/feed/user/${tweet.id}`, state: { user: tweet.username, id: tweet.id }}}>@{tweet.username}</Link>
                        <div className="d-flex"> 
                            <p className="pt-2">{tweet.message}</p>
                            {deleteButton}
                         </div>
                    </div>
                )    
            })
        } else {
            return <p><small>Loading</small></p>
        }
    }

    return <LoadUserFeed key={data} />
}

export default UserFeed