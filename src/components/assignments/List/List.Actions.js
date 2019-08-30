import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default ({ currentUserId, destroyAssignment, assignment, user, admin}) => (
  <div className='card-footer text-muted d-flex justify-content-around'>
    <>
    {
      currentUserId === user._id
      && (
        <>
          <Link className='btn btn-link' to={`/users/${user._id}/assignments/${assignment._id}/edit`}>Edit Assignment</Link>
          <button
            className='btn btn-link text-danger'
            onClick={() => destroyAssignment(assignment)}>
            Delete Assignment
          </button>
        </>
      )
    }
    </>
    <>
    {
      (admin || currentUserId === user._id)
      &&
       ( <>
          { (assignment.grade)?
            <aside className="btn btn-link" 
              style={
                {color:`rgb(${(1-assignment.grade/assignment.max_grade)*255},
                ${(assignment.grade/assignment.max_grade)*255},
                0)`}
              }>
              {assignment.grade}/{assignment.max_grade}
            </aside> 
          :"Grade TBD"
          }
         </>
      )
    }
    </>
    
    <span className='btn btn-link text-muted' disabled>Created {moment(assignment.created_at).fromNow()}</span>
  </div>
)
