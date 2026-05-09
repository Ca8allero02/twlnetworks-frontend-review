import { BrowserRouter, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRouter from './router/AppRouter'
import PageTransition from './components/shared/PageTransition'

function Layout() {
  const location = useLocation()
  const isKanat = location.pathname.startsWith('/kanat')

  return (
    <>
      {!isKanat && <Navbar />}
      <PageTransition>
        <main>
          <AppRouter />
        </main>
      </PageTransition>
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