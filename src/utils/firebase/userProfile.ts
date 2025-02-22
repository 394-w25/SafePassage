import type { User } from 'firebase/auth'

import { getDocument, getOrCreateDocument } from './firebaseUtils'

const getUserProfile = async (
  user: User,
): Promise<UserProfile | undefined> => {
  const { uid, email, photoURL, displayName } = user

  const defaultProfile: UserProfile = {
    uid,
    email: email as string,
    profilePic: photoURL ?? '',
    name: displayName ?? 'Unnamed User',
    createdAt: new Date().toISOString(),
    role: 'user' as UserType,
    onboarded: false,
  }

  const userProfile = await getOrCreateDocument(uid, 'users', defaultProfile)

  return userProfile
}

const getUIDProfile = async (uid?: string): Promise<UserProfile | undefined> => {
  return uid !== undefined ? getDocument(uid, 'users') : undefined
}

export { getUIDProfile, getUserProfile }
