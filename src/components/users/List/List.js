import React from 'react'
import { Link } from 'react-router-dom'

export default ({ users }) => {
  const list = users.map(user => (
    <li key={user._id}>
      <Link to={`/users/${user._id}/assignments`}>
      {
          (user.first_name) ? user.first_name : user.email
      }
      : {user.assignments.length} Assignments
      </Link>
    </li>
  ))

  return (
    <>
      <h1>All Students</h1>
      <ul>
        { list }
      </ul>
    </>
  )
}
