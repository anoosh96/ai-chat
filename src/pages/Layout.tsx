import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Layout() {
  
  const { isAuthenticated, handleLogout } = useAuth()
  console.log('authenticated', isAuthenticated)

  return (
    <div className="min-h-screen flex flex-col">
        {/* Header */}
        <nav className="bg-blue-600 p-4 text-white">
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-blue-200">Home</a></li>
            <li><a href="/about" className="hover:text-blue-200">About</a></li>

            {
              isAuthenticated &&
                <button className="hover:text-blue-200" onClick={handleLogout}>Log Out</button>
            }
          </ul>
        </nav>

        {/* Routes */}
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
  )
}

export default Layout