import { AuthProvider } from './authContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
// import App from './App.jsx'
import ProjectRoutes from './Routes.jsx';
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <ProjectRoutes />
    </Router>
  </AuthProvider>

)
