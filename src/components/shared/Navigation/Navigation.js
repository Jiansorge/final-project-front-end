import React from 'react'

import AdminLinks from './Navigation.AdminLinks'
import AuthenticatedLinks from './Navigation.AuthenticatedLinks'
import UnauthenticatedLinks from './Navigation.UnauthenticatedLinks'

export default ({ currentUserId, currentName, logoutUser, admin }) => (
  <section className='bg-light border-bottom mb-4'>
    <div className='container'>
      {
        admin
        ? <AdminLinks currentUserId={currentUserId} currentName={currentName} logoutUser={logoutUser} admin={admin}/>
        :  currentUserId
          ? <AuthenticatedLinks currentUserId={currentUserId} currentName={currentName} logoutUser={logoutUser} />
          : <UnauthenticatedLinks />
      }
    </div>
  </section>
)
