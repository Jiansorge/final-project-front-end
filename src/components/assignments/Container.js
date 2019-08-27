import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

// Helpers
import * as assignments from '../../api/assignments'

// Components
import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assignmentError: false
    }
    this.createAssignment = this.createAssignment.bind(this)
    this.destroyAssignment = this.destroyAssignment.bind(this)
    this.editAssignment = this.editAssignment.bind(this)
  }

  async createAssignment (assignment) {
    const { currentUserId, history, refreshUsers } = this.props

    const response = await assignments.createAssignment({ user: { _id: currentUserId }, assignment })
    if (response.status === 401) {
      this.setState({assignmentError: true})
      return
    } else {
      this.setState({assignmentError: false})
      await refreshUsers()

    history.push(`/users/${currentUserId}/assignments`)
    }
  }

  async destroyAssignment(assignment) {
    const { currentUserId, history, refreshUsers } = this.props
    
    const response = await assignments.destroyAssignment({ user: { _id: currentUserId }, assignment })
    if (response.status === 401) {
      this.setState({assignmentError: true})
      return
    } else {
      this.setState({assignmentError: false})
    
      await refreshUsers()
      
      history.push(`/users/${currentUserId}/assignments`)
    }
  }

  async editAssignment (assignment) {
    const { currentUserId, history, refreshUsers } = this.props

    const response = await assignments.updateAssignment({ user: { _id: currentUserId }, assignment })
    if (response.status === 401) {
      this.setState({assignmentError: true})
      return
    } else {
      this.setState({assignmentError: false})
      await refreshUsers()

    history.push(`/users/${currentUserId}/assignments`)
  }}

  render () {
    const { currentUserId, users, assignmentError } = this.props
    return (
      <>
        <Route path='/users/:userId/assignments' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return (
            <List
              currentUserId={currentUserId}
              destroyAssignment={this.destroyAssignment}
              user={user} />
          )
        }} />
        <Route path='/users/:userId/assignments/new' exact component={() => {
          return <NewForm onSubmit={this.createAssignment} assignmentError={assignmentError}/>
        }} />
        <Route path='/users/:userId/assignments/:assignmentId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          const assignment = user.assignments.find(user => user._id === match.params.assignmentId)
          return <EditForm onSubmit={this.editAssignment} assignment={assignment} />
        }} />
      </>
    )
  }
}


export default withRouter(Container)
