import { updateProfile } from 'firebase/auth'
import React from 'react'
import { auth, upload } from '../../Firebase/firebase'

const EditPage = () => {
  upload('profilePic', 'email')

  updateProfile(auth.currentUser, {
    displayName: 'fullName',
    photoURL: 'profilePic',
  })
  return (
    <div>EditPage</div>
  )
}

export default EditPage
