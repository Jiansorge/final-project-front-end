import React from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'

// Helpers
import * as assignments from '../../api/assignments'

// Components
import List from './List/List'
import ListUngraded from './List/List.Ungraded'
import ListGraded from './List/List.Graded'
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

  async saveGrade (assignment) {
    const { currentUserId, history, refreshUsers } = this.props

    await assignments.updateAssignment({ user: { _id: 
      currentUserId }, assignment })
    await refreshUsers()

    history.push(`/users/${currentUserId}/assignments/ungraded`)
  }

  render () {
    const { currentUserId, users, assignmentError, admin} = this.props
    return (
      <>
        <Route path='/users/:userId/assignments' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return (
            <List
              currentUserId={currentUserId}
              destroyAssignment={this.destroyAssignment}
              user={user} 
              admin={admin}/>
          )
        }} />

        <Route path='/users/:userId/assignments/ungraded' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return admin ? (
            <ListUngraded
              currentUserId={currentUserId}
              destroyAssignment={this.destroyAssignment}
              user={user} 
              onSubmit={this.saveGrade}
              admin={admin}/>
          ) : <Redirect to='/users' />
        }} />

        <Route path='/users/:userId/assignments/graded' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          return admin ?(
            <ListGraded
              currentUserId={currentUserId}
              destroyAssignment={this.destroyAssignment}
              user={user} 
              onSubmit={this.saveGrade}
              admin={admin}/>
          ) : <Redirect to='/users' />
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

// return admin ?(
//   <ListGraded
//     currentUserId={currentUserId}
//     destroyAssignment={this.destroyAssignment}
//     user={user} 
//     onSubmit={this.saveGrade}
//     admin={admin}/>
// ) : <Redirect to='/users/:userId/assignments' />
// }} />


export default withRouter(Container)
