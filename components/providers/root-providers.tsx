'use client'

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      {children}
    </ThemeProvider>
  )
}

export default RootProvider