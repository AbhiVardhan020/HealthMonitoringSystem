import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white h-screen sticky top-0">
        <NavBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-y-auto p-6">
        <Outlet />
      </div>

    </div>
  )
}
