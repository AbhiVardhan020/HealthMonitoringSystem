import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      
      <div className="w-64 bg-gray-900 text-white">
        <NavBar />
      </div>

      <div className="flex-1 p-6 bg-gray-100 overflow-y-scroll">
        <Outlet />
      </div>

    </div>
  )
}
