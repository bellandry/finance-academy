import { CurrencyComboBox } from '@/components/currency-combobox'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Wizard = async() => {
  const user = await currentUser()
  if(!user) {
    redirect("sign-in")
  }

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className='text-center text-3xl'>
          Bienvenu, <span className='ml-2 font-bold'>{user.firstName} 😊</span>
        </h1>
        <h2 className='mt-4 text-center text-base text-muted-foreground'>
          Commencez par définir votre devise
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          Vous pourrez changer à nouveau ce paramètre n&apos;importe quand
        </h3>
      </div>
      <Separator />
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Devise</CardTitle>
          <CardDescription>
            Choisissez votre devise par défaut
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className='w-full' asChild>
        <Link href={"/"}>C&apos;est fait, aller au dashboard</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  )
}

export default Wizard