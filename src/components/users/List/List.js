import React from 'react'
import { Link } from 'react-router-dom'

class List  extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sum: 0,
      max_sum:0,
      users: this.props.users
    }
    this.sumGrades = this.sumGrades.bind(this)

  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
      .then(() => this.props.history.push('/users'))
  }

  sumGrades (user) {
     let sum = 0
     let max_sum=0
      for (let el in user.assignments) {
        if (user.assignments[el].grade){  
          console.log(sum)
          sum += user.assignments[el].grade
          max_sum+= user.assignments[el].max_grade
        }
      }

      if (sum){
        return `${sum} / ${max_sum}`
      } else {
        return
      }
  }

  list () { 
  
    return(
    this.props.users.map(user => (
    <li key={user._id}>
      <Link to={`/users/${user._id}/assignments`}>
      {user.first_name }{'- '}
      { user.email}
      : {user.assignments.length} Assignments
      </Link>

      {(this.props.admin &&
      (<aside className= 'text-right btn d-inline'
>
        {this.sumGrades(user)}
      </aside>))}
    </li>
  )))
  }

render(){
  // const {users} = this.state
  return (
    <>
      <h1>All Students</h1>
      <form onSubmit={this.handleSubmit} className='row'>
        <div className='form-group d-inline'>
            <label htmlFor='score-above'>Score is Above:</label>
            <input
              type='text'
              className='form-control col-2'
              id='score-above'
              onChange={this.handleChange}
              name='score-above'
              />
          </div>
          <div className='form-group d-inline'>
            <label htmlFor='score-below'>Score is Below:</label>
            <input
              type='text'
              className='form-control col-2'
              id='score-below'
              onChange={this.handleChange}
              name='score-below'
               />
          </div>
          <button
            className='btn btn-link  d-inline'
            onClick={() => this.saveGrade}>
            Filter
          </button>
        </form>

      <ul>
        { this.list() }
      </ul>
    </>
  )
}}

export default List
