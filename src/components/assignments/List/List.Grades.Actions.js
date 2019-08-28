import React from 'react'
// import { Link } from 'react-router-dom'

export default class GradeActions extends React.Component {
  constructor (props) {
    super(props)
    const { assignment, currentUserId,  saveGrade  } = this.props
    const { grade='', max_grade=''} = assignment
    this.state = { 
      grade, 
      max_grade
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { assignment } = this.props

    if (assignment && assignment._id) {
      const body = Object.assign({}, this.state, { _id: assignment._id })
      this.props.onSubmit(body)
    } else {
      this.props.onSubmit(this.state)
    }
  }
  

  render(){
    const { assignment, admin, saveGrade } = this.state
    return(
  <div className='card-footer text-muted d-flex justify-content-around'>
    {
        <>
          <div className='form-group'>
            <label htmlFor='student-grade'>Student Grade</label>
            <input
              type='text'
              className='form-control'
              id='student-grade'
              onChange={this.handleChange}
              name='student-grade'
              value={this.state.grade} />
          </div>
          <div className='form-group'>
            <label htmlFor='max-grade'>Max Grade</label>
            <input
              type='text'
              className='form-control'
              id='max-grade'
              onChange={this.handleChange}
              name='max-grade'
              value={this.state.maxGrade} />
          </div>
          <button
            className='btn btn-link'
            onClick={() => saveGrade(assignment)}>
            Save Grades
          </button>
        </>
      //)
    }
  </div>
    )}}