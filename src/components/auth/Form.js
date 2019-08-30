import React from 'react'
import { withRouter } from 'react-router'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      errors:this.props.errors
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
      .then(() => this.props.history.push('/users'))
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        { this.props.signup 
        &&
        <>
        <div className='form-group'>
          <label htmlFor='first_name'>First Name</label>
          <input
            className='form-control'
            id='first_name'
            onChange={this.handleChange}
            name='first_name'
            type='text'
            value={this.state.first_name} />
        </div>
        <div className='form-group'>
          <label htmlFor='last_name'>Last Name</label>
          <input
            className='form-control'
            id='last_name'
            onChange={this.handleChange}
            name='last_name'
            type='text'
            value={this.state.last_name} />
        </div>
        </>
        }
        
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-control'
            id='email'
            onChange={this.handleChange}
            name='email'
            type='text'
            value={this.state.email} 
            required/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            id='password'
            onChange={this.handleChange}
            name='password'
            type='password'
            value={this.state.password} 
            required />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
        { this.state.errors && <span className='alert alert-danger'>{this.state.errors}</span>}
      </form>
    )
  }
}

export default withRouter(Form)
