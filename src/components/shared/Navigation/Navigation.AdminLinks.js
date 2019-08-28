import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const AdminLinks = ({ currentUserId, currentName, history, logoutUser }) => {
  const logout = () => {
    logoutUser()
    history.push('/login')
  }

  return (
    <ul className='nav justify-content-end'>

      <li className='nav-item'>
        <Link className='nav-link' to='/users'>
          All Students
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to={`/users/${currentUserId}/assignments/ungraded`}>
            Ungraded Assignments
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to={`/users/${currentUserId}/assignments/graded`}>
            Graded Assignments
        </Link>
      </li>
      <li className='nav-item'>
        <button
          className='btn btn-link'
          onClick={logout}>
            Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(AdminLinks)
