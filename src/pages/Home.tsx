/* eslint-disable ts/no-unsafe-argument, react/no-nested-components, react/no-unstable-default-props, react/no-array-index-key, ts/strict-boolean-expressions */
import { useUserStore } from '@/stores'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const user = useUserStore(state => state.user)
  const login = useUserStore(state => state.login)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const InfoSection = ({ title, items = [] }) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {items.length === 0
        ? (
            <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              None recorded
            </Typography>
          )
        : (
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <Typography variant="body1">{item}</Typography>
                </li>
              ))}
            </ul>
          )}
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {user
        ? (
            <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 800, mx: 'auto' }}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Welcome back,
                {' '}
                {user.name}
                !
              </Typography>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Health Information
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Date of Birth
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(user.healthData?.dateOfBirth)}
                  </Typography>
                </Box>

                <InfoSection
                  title="Allergies"
                  items={user.healthData?.healthInfos?.allergies}
                />

                <InfoSection
                  title="Medical Conditions"
                  items={user.healthData?.healthInfos?.medicalConditions}
                />

                <InfoSection
                  title="Medical Devices"
                  items={user.healthData?.healthInfos?.medicalDevices}
                />

                <InfoSection
                  title="Past Surgeries"
                  items={user.healthData?.healthInfos?.pastSurgeries}
                />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Emergency Contacts
                  </Typography>
                  {!user.healthData?.contacts?.length
                    ? (
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                          No emergency contacts recorded
                        </Typography>
                      )
                    : (
                        <Box sx={{ display: 'grid', gap: 2 }}>
                          {user.healthData.contacts.map(contact => (
                            <Paper key={contact.id} sx={{ p: 2 }}>
                              <Typography variant="subtitle1">{contact.name}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {contact.relationship}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {contact.phone}
                              </Typography>
                            </Paper>
                          ))}
                        </Box>
                      )}
                </Box>
              </Paper>
            </Box>
          )
        : (
            <Box>
              <Typography variant="h4">Welcome to the app!</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>Please log in to continue.</Typography>
              <Button variant="contained" onClick={async () => login(navigate)}>
                Log in
              </Button>
            </Box>
          )}
    </Box>
  )
}

export default Home
