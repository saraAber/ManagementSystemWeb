import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Components/Continer/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
