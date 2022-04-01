import React from 'react'

const ChirpCard = ({username, message, created}) => {
    return (
        <>
            <h3>{username}</h3>
            <p>{message}</p>
            <p></p>
            <small>{created}</small>
        </>
    )
}

export default ChirpCard;