import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

export const UserFeed = (props) => {
    const user = props.user

    return (
        <>
            <div>{user} profile</div>
        </>
    )
}

export default UserFeed