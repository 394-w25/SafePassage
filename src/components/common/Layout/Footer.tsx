import EventIcon from '@mui/icons-material/EventAvailable'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import { BottomNavigationAction } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'

import { Link, useLocation } from 'react-router-dom'

// Get the index of the page based on the path
const getPageIndex = (path: string) => {
  switch (path) {
    case '/': {
      return 0
    }
    case '/trip': {
      return 1
    }
    case '/user': {
      return 2
    }
    default: {
      return 0
    }
  }
}

const Footer = () => {
  const location = useLocation()

  // Build navigation actions as an array
  const navigationActions = [
    <BottomNavigationAction
      key="home"
      label="Home"
      icon={<HomeIcon />}
      component={Link}
      to="/"
    />,
    <BottomNavigationAction
      key="trip"
      label="Medication"
      icon={<EventIcon />}
      component={Link}
      to="/trip"
    />,
    <BottomNavigationAction
      key="user"
      label="Me"
      icon={<PersonIcon />}
      component={Link}
      to="/user"
    />,
  ]

  return (
    <BottomNavigation
      className="bottom-nav"
      value={getPageIndex(location.pathname)}
      showLabels
      sx={{
        backgroundColor: 'primary.light',
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensure the footer is always on top
      }}
    >
      {navigationActions}
    </BottomNavigation>
  )
}

export default Footer
