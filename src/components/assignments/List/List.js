import React from 'react'

import Actions from './List.Actions'

export default ({ currentUserId, destroyAssignment, user, saveGrade, admin }) => {
  const assignments = user.assignments.map(assignment => (
    <div key={assignment._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ assignment.title }</p>
        <blockquote className='blockquote mb-0'>
          <footer className='blockquote-footer'> { assignment.link }</footer>
          <footer className='blockquote-footer'> { assignment.description }</footer>

        </blockquote>

      </div>
      <Actions
        currentUserId={currentUserId}
        destroyAssignment={destroyAssignment}
        assignment={assignment}
        user={user}
       />
    </div>
  ))

  return (
    <>
      <h1 className='mb-4'>
      {
        (user.first_name) ? user.first_name : user.email
      }
      's Assignments
      </h1>
      { assignments }
    </>
  )
}
