import { ConfirmationDialog } from '@/components/common'
import { ActionButtons, MainInfo } from '@/components/Me'
import EditableSection from '@/components/Onboarding/EditableSection'

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
  const { healthData } = userData || {}
  const { healthInfos } = healthData || {}

  const handleHealthInfoUpdate = async (key: keyof HealthInfos, newData: string[]) => {
    await updateProfile({
      healthData: {
        ...userData?.healthData,
        healthInfos: {
          ...userData?.healthData?.healthInfos,
          [key]: newData,
        },
        dateOfBirth: userData?.healthData?.dateOfBirth ?? '',
      },
    })
  }

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
      {/* Editable Health Info */}
      <Box mt={3}>
        <Box sx={{ p: 2, backgroundColor: '#FAFAFC', borderRadius: 1 }}>
          <Box sx={{ fontWeight: 'bold', mb: 1 }}>Medical Information</Box>
          {Object.entries(healthInfos || {}).map(([key, items]) => (
            <EditableSection
              key={key}
              title={key as keyof HealthInfos}
              items={items as string[]}
              onSave={async newData => handleHealthInfoUpdate(key as keyof HealthInfos, newData)}
            />
          ))}
        </Box>
      </Box>

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
