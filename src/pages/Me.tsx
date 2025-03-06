import { ConfirmationDialog } from '@/components/common'
import { EditProfileForm, MainInfo } from '@/components/Me'
import { useUserStore } from '@/stores'
import { Box, Button } from '@mui/material'
import { useToggle } from '@zl-asica/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Me = () => {
  const navigate = useNavigate()
  const userData = useUserStore(state => state.user)
  const logout = useUserStore(state => state.logout)

  const [editing, setEditing] = useState(false)
  const [confirmDialogOpen, toggleConfirmDialog] = useToggle()

  return (
    <Box mx="auto" sx={{ px: 3, py: 5, margin: 2 }}>
      {!editing
        ? (
            <>
              <MainInfo
                displayName={userData?.name}
                email={userData?.email}
                timeInfo={userData?.timeInfo}
                profilePic={userData?.profilePic}
                healthData={userData?.healthData}
              />
              <Box display="flex" justifyContent="center" gap={2} mt={4}>
                <Button variant="outlined" onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              </Box>
            </>
          )
        : (
            <EditProfileForm onCancel={() => setEditing(false)} onSave={() => setEditing(false)} />
          )}

      {/* Signout button */}
      {!editing && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="outlined" onClick={toggleConfirmDialog} color="error">
            Log out
          </Button>
        </Box>
      )}

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
