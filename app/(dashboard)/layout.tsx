import Navbar from '@/components/navbar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex h-screen w-full flex-col" >
      <Navbar />
      <div className="w-full">
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout