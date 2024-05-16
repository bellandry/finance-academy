import { PiggyBank } from 'lucide-react'

const Logo = () => {
  return (
    <a href='/' className='flex items-center gap-2 z-10'>
      <PiggyBank className='stroke h-10 w-10 stroke-amber-600 stroke-[1.5]' />
      <p className='bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-2xl font-bold leading-light tracking-tighter text-transparent'>Finance Academy</p>
    </a>
  )
}

export const LogoMobile = () => {
  return (
    <a href='/' className='flex items-center gap-2 z-10'>
      <PiggyBank className='stroke h-10 w-10 stroke-amber-600 stroke-[1.5]' />
      <p className='bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-2xl font-bold leading-light tracking-tighter text-transparent'>AFP</p>
    </a>
  )
}

export default Logo