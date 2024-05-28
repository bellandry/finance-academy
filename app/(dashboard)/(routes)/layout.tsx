import Navbar from '@/components/navbar';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId }: { userId: string | null } = auth();
  return (
    <main className="relative flex h-screen w-full flex-col" >
      <Navbar userId={userId} />
      <div className="w-full">
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout