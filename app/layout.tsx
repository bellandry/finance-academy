import RootProvider from "@/components/providers/root-providers"
import { Toaster } from "@/components/ui/sonner"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Je suis mon budget - Academy des Finances Personnelles",
  description: "Trackez vos dépenses au quotidien",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" className="dark" style={{ colorScheme: 'dark' }}>
        <Toaster richColors position="bottom-right" />
        <body className={inter.className}>
          <RootProvider>
            {children}
          </RootProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
