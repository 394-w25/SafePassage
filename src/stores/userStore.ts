import type { NavigateFunction } from 'react-router-dom'
import { auth, loginUser, logoutUser, subscribeToDocument, updateDocument } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: UserProfile | undefined
  loading: boolean
  error: string | null
  login: (navigate: NavigateFunction) => Promise<void>
  logout: (navigate: NavigateFunction) => Promise<void>
  updateProfile: (updates: Partial<UserProfile>, showToast?: boolean) => Promise<void>
  initializeAuthListener: () => () => void
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: undefined,
      loading: false,
      error: null,

      initializeAuthListener: () => {
        let unsubscribeDoc: () => void = () => {}

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
          set({ loading: true, error: null })

          if (firebaseUser) {
            unsubscribeDoc = subscribeToDocument<UserProfile>(
              'users',
              firebaseUser.uid,
              (data) => {
                if (data) {
                  set({ user: data })
                }
              },
            )
          }
          else {
            unsubscribeDoc()
            set({ user: undefined })
          }

          set({ loading: false })
        })

        return () => {
          unsubscribeAuth()
          unsubscribeDoc()
        }
      },

      login: async (navigate) => {
        try {
          set({ loading: true, error: null })
          const profile = await loginUser()

          if (profile) {
            set({ user: { ...profile } })
            await navigate('/')
          }
        }
        catch (error) {
          console.error('Error during login:', error)
          set({ error: 'Login failed. Please try again.' })
          toast.error('Login failed. Please try again.')
        }
        finally {
          set({ loading: false })
        }
      },

      logout: async (navigate) => {
        try {
          set({ loading: true, error: null })
          await logoutUser()

          set({ user: undefined })
          toast.success('Logged out successfully.')
          await navigate('/')
        }
        catch (error) {
          console.error('Error during logout:', error)
          set({ error: 'Logout failed. Please try again.' })
          toast.error('Logout failed. Please try again.')
        }
        finally {
          set({ loading: false })
        }
      },

      updateProfile: async (updates, showToast = true) => {
        const currentUser = get().user
        if (!currentUser) {
          console.warn('No user is currently logged in.')
          return
        }

        try {
          await updateDocument(currentUser.uid, 'users', updates)
          set({ user: { ...currentUser, ...updates } })
          if (showToast) {
            if (!currentUser.onboarded) {
              toast.success('Profile setup completed!\nYou can now access your dashboard.')
            }
            else {
              toast.success('Profile updated successfully!')
            }
          }
        }
        catch (error) {
          console.error('Error updating profile:', error)
          set({ error: 'Profile update failed. Please try again.' })
          toast.error('Profile update failed. Please try again.')
        }
      },
    }),
    { name: 'user-store' },
  ),
)

export default useUserStore
