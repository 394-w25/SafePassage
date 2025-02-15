import { useUserStore } from '@/stores'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const user = useUserStore(state => state.user)
  const login = useUserStore(state => state.login)

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
            <Box sx={{ textAlign: 'center' }}>
              <h1>
                Welcome back,
                {user.name}
                !
              </h1>
            </Box>
          )
        : (
            <Box>
              <h1>Welcome to the app!</h1>
              <p>Please log in to continue.</p>
              <Button onClick={async () => login(navigate)}>Log in</Button>
            </Box>
          )}
    </Box>
  )
}

export default Home
