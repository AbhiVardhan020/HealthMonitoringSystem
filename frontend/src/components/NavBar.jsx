import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-full p-6 bg-gray-900 text-gray-200">

            <div className="text-2xl font-semibold text-white mb-8">
                HealthTrack
            </div>

            <div className="space-y-3">

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors" onClick={()=>navigate('/')}>
                Home
                </div>

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors" onClick={()=>navigate('/dashboard')}>
                    Dashboard
                </div>

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors" onClick={()=>navigate('/journal')}>
                    Journal
                </div>

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors" onClick={()=>navigate('/reports')}>
                    Reports
                </div>

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors" onClick={()=>navigate('/insights')}>
                    Insights
                </div>

            </div>

            <div className="flex-1" />

            <div className="space-y-3">

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors" onClick={()=>navigate('/profile')}>
                    Profile
                </div>

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white transition-colors" onClick={()=>navigate('/signup')}>
                    Signup
                </div>

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white transition-colors" onClick={()=>navigate('/signin')}>
                    Signin
                </div>

                <div className="px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white transition-colors">
                    Logout
                </div>

            </div>

        </div>
    )
}
