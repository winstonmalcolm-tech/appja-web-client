import React from 'react'
import { Link } from 'react-router-dom'


const CompleteOrder = () => {
  return (
    <div>
        <center>
            <h1>Order Successfully</h1>
            <Link to="/profile">Profile Page</Link>
        </center>
    </div>
  )
}

export default CompleteOrder