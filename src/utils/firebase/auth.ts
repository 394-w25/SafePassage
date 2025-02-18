import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

import { auth } from './firebaseConfig'
import getUserProfile from './userProfile'

const loginUser = async (): Promise<UserProfile | undefined> => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    const userProfile = await getUserProfile(result.user)
    return userProfile
  }
  catch (error) {
    console.error('Error during login:', error)
    return undefined
  }
}

const logoutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth)
    return true
  }
  catch (error) {
    console.error('Error during sign-out:', error)
    return false
  }
}

export { loginUser, logoutUser }
