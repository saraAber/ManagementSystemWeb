import { Outlet } from 'react-router-dom'
import './App.css'
import ManagerProvider from './Store/ManagerStore'
import Header from './Components/Continer/Header'
import { Box } from '@mui/material'

/**
 * The main component of the application
 * @returns {JSX.Element} The main component of the application
 */
function App() {

  return (
    <>
      {/* The provider of the manager state */}
      <ManagerProvider>
        {/* The main box of the application */}
        <Box sx={{ flexGrow: 1 }}>
          {/* The header of the application */}
          <Header />
          {/* The main content of the application */}
          <Box component="main" sx={{ p: 3 }}>
            {/* The outlet of the application */}
            <Outlet />
          </Box>
        </Box>
      </ManagerProvider>
    </>
  )
}

export default App

