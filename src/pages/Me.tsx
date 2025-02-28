import { ConfirmationDialog } from '@/components/common'
import { ActionButtons, MainInfo } from '@/components/Me'

import { useUserStore } from '@/stores'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { useToggle } from '@zl-asica/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Me = () => {
  const navigate = useNavigate()
  const userData = useUserStore(state => state.user)
  const updateProfile = useUserStore(state => state.updateProfile)
  const logout = useUserStore(state => state.logout)

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(userData?.name ?? '')
  const [email, setEmail] = useState(userData?.email ?? '')
  const [confirmDialogOpen, toggleConfirmDialog] = useToggle()

  const handleSave = async () => {
    if (name !== userData?.name || email !== userData?.email) {
      setLoading(true)
      try {
        await updateProfile({ name, email })
        toast.success('Profile updated')
      }
      catch (error_) {
        toast.error('Failed to update profile')
        console.error('Failed to update profile: ', error_)
      }
      finally {
        setLoading(false)
      }
    }
    else {
      toast.info('No changes to save')
    }
    setEditing(false)
  }

  return (
    <Box
      mx="auto"
      sx={{
        px: 3,
        py: 5,
        margin: 2,
      }}
    >
      <MainInfo
        editing={editing}
        displayName={name}
        email={email}
        userData={userData ?? null}
        onChangeDisplayName={name => setName(name)}
        onChangeEmail={setEmail}
      />

      <ActionButtons
        editing={editing}
        onSave={handleSave}
        loading={loading}
        onCancel={() => setEditing(false)}
        onEdit={() => setEditing(true)}
      />

      {/* Signout button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="outlined" onClick={toggleConfirmDialog} color="error">
          Log out
        </Button>
      </Box>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={toggleConfirmDialog}
        onConfirm={async () => {
          await logout(navigate)
          toggleConfirmDialog()
        }}
        title="Sign Out"
        description="Are you sure you want to sign out?"
        maxWidth="xs"
      />

    </Box>
  )
}

export default Me
