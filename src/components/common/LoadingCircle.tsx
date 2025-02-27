import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingCircleProps {
  textInfo?: string
}

const LoadingCircle = ({ textInfo }: LoadingCircleProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={textInfo !== undefined ? 'column' : 'row'}
      minHeight="100vh"
    >
      {textInfo !== undefined && (
        <Typography variant="h6" sx={{ mb: 3 }}>{textInfo}</Typography>
      )}
      <CircularProgress />
    </Box>
  )
}

export default LoadingCircle
