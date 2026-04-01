import { BrowserRouter, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRouter from './router/AppRouter'

function Layout() {
  const location = useLocation()
  const isKanat = location.pathname.startsWith('/kanat')

  return (
    <>
      {!isKanat && <Navbar />}
      <main>
        <AppRouter />
      </main>
      {!isKanat && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App