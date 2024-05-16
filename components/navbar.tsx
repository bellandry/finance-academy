'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Logo, { LogoMobile } from './logo'
import { ThemeSwitcherBtn } from './theme-swuitcher-btn'
import { Button, buttonVariants } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const items = [
  { label: 'Accueil', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Transactions', link: '/transactions' },
  { label: 'Gérer', link: '/manage' }
]

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  )
}

const DesktopNavbar = () => {
  return (
    <div className='hidden md:block border-separate border-b bg-background'>
      <nav className="container flex items-center justify-between px-8">
        <div className='flex h-[70px] min-h-[60px] items-center gap-x-4'>
          <Logo />
          <div className="flex h-full">
            {items.map(item => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl='/' />
        </div>
      </nav>
    </div>
  )
}

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="block border-separate bg-backgound border-b md:hidden">
      <nav className="container flex items-center justify-between px-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Button variant="ghost" size='icon'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className='flex flex-col gap-2 pt-4'>
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  clickCallback={() => setIsOpen((open) => !open)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[70px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl='/' />
        </div>
      </nav>
    </div>
  )
}

const NavbarItem = ({ link, label, clickCallback }: { link: string, label: string, clickCallback?: () => void }) => {
  const pathName = usePathname()
  const isActive = pathName === link

  return (
    <div className="relative flex items-center">
      <Link href={link} className={cn(
        buttonVariants({
          variant: 'ghost'
        }),
        "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
        isActive && "text-foreground")}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>
      {
        isActive && (
          <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-orange-600 md:block" />
        )
      }
    </div>
  )
}

export default Navbar