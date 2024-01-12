import React from 'react'
import { Link } from 'react-router-dom'

const SubmitForReview = () => {
  return (
    <div>
      <div className="prose">
        <h1>Submitted for Review</h1>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}

export default SubmitForReview