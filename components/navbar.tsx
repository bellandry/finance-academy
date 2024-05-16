'use client'

import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './logo'
import { ThemeSwitcherBtn } from './theme-swuitcher-btn'
import { buttonVariants } from './ui/button'

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
    </>
  )
}

const DesktopNavbar = () => {
  return (
    <div className='hidden md:block border-b bg-background'>
      <nav className="container flex items-center justify-between px-8">
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
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

const NavbarItem = ({ link, label }: { link: string, label: string }) => {
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