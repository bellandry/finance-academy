import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <main className= "pt-[70px] h-full md:pl-64" >
        {children}
      </main>
  )
}

export default DashboardLayout