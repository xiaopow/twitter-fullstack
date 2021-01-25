import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const UserFeed = (props) => {
    const { id } = useParams()
    const user = props.user
    const userId = props.userId
    const data = props.data
    
    useEffect(() => {
    }, [])

    const LoadUserFeed = () => {
        if (props.data) {
            const data = props.data
            return data.slice(0).reverse().map((tweet) => {
                return (
                    <div className="tweet col-xs-12" key={tweet.id}>
                        <a className="tweet-username" href="#">{tweet.username}</a>
                        <a className="ml-2 tweet-screenName" href="#">@{tweet.username}</a>
                        <div className="d-flex"> 
                            <p className="pt-2">{tweet.message}</p>
                            <button className="delete-tweet btn bg-primary text-light ml-auto mt-auto py-1" id={tweet.id} onClick={props.delete}>Delete</button>
                         </div>
                    </div>
                )    
            })
        } else {
            return <p>Loading</p>
        }
    }

    return (
        <>
            <LoadUserFeed />
        </>
    )
}

export default UserFeed