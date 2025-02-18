import type { User } from 'firebase/auth'

import { getOrCreateDocument } from './firebaseUtils'

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

export default getUserProfile
