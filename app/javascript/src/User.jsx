import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSession, destroySession, fetchFeed, postTweet, delTweet, fetchUserTweets } from './utils';


export const UserFeed = (props) => {
    const { id } = useParams()
    const user = props.user
    const userId = props.userId
    //const data = props.data
    const linkState = useHistory()
    const [ data, setData ] = useState(null)
    const [ userKey, setUserKey ] = useState(0)
    
    useEffect(() => {
        userData()
    }, [linkState.location.state.user])

    const userData = async () => {
        if (linkState.location.state) {
            const username = linkState.location.state.user
            console.log(username)
            const userData = await fetchUserTweets(username)
            await setData(userData.tweets)
        }
    }

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
                        <a className="tweet-username" href="#" disabled>{tweet.username}</a>
                        <a className="ml-2 tweet-screenName" href="#" disabled>@{tweet.username}</a>
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

    return (
        <>
            <LoadUserFeed key={data} />
        </>
    )
}

export default UserFeed