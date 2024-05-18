'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandInput } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TransactionType } from '@/lib/types'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

interface CategoryPickerProps {
  type: TransactionType
}

function CategoryPicker({ type }: CategoryPickerProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => 
      res.json()
    )
  })

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role={'combobox'}
          aria-expanded={open}
          className='ml-4 w-[300px] justify-between'
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Sélectionnez une catégories"
          )}

        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
         <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
         >
          <CommandInput placeholder='Rechercher une catégorie' />
         </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryPicker

function CategoryRow({category}: {category: Category}) {
  return (
    <div className="flex items-center gap-2">
      <span role='img'>{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )
}