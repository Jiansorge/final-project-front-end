import React from 'react'
// import { Link } from 'react-router-dom'

export default class GradeActions extends React.Component {
  constructor (props) {
    super(props)
    const { assignment } = this.props
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
    } else {
    }
  }
  

  render(){
    const { grade, max_grade} = this.state
    return(
  <div className='card-footer text-muted d-flex justify-content-around'>
    {
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
            <label htmlFor='student-grade'>Student Grade</label>
            <input
              type='text'
              className='form-control'
              id='grade'
              onChange={this.handleChange}
              name='grade'
              placeholder={grade}
              value={grade?grade:""}
              required/>
          </div>
          <div className='form-group'>
            <label htmlFor='max-grade'>Max Grade</label>
            <input
              type='text'
              className='form-control'
              id='max-grade'
              onChange={this.handleChange}
              name='max-grade'
              placeholder={max_grade}
              value={max_grade?max_grade:""}
              required />
          </div>
          <button
            className='btn btn-link'
            onClick={() => this.saveGrade}>
            Save Grades
          </button>
        </form>
      //)
    }
  </div>
    )}}
