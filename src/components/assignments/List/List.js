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
        {/* TODO {
          user.admin 
          && (
            <>
                <div className='form-group'>
                  <label htmlFor='student-grade'>Student Grade</label>
                  <input
                    type='checkbox'
                    className='form-control'
                    id='student-grade'
                    onChange={this.handleChange}
                    name='description'
                    type='text'
                    value={this.state.studentGrade} />
                </div>
              </Link>
              <button
                className='btn btn-link text-danger'
                onClick={() => saveGrade(assignment)}>
                Save Grade
              </button>
            </>
          )
        } */}
      </div>
      <Actions
        currentUserId={currentUserId}
        destroyAssignment={destroyAssignment}
        assignment={assignment}
        user={user}
        saveGrade={saveGrade} 
        admin={admin}/>
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
