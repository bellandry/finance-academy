'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TransactionType } from '@/lib/types'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import CreateCategoryDialog from './create-category-dialog'

interface CategoryPickerProps {
  type: TransactionType
}

function CategoryPicker({ type }: CategoryPickerProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then(res =>
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
          className='ml-4 w-[200px] justify-between'
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Choisissez en une"
          )}

        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder='Chercher une catégorie...' />
          <CreateCategoryDialog type={type} />
          <CommandEmpty>
            <p>Catégorie non trouvée</p>
            <p className="text-xs text-muted-foreground">Créer une catégorie</p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data && categoriesQuery.data.map((category: Category) => (
                <CommandItem
                  key={category.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen((prev) => !prev)
                  }}
                >
                  <CategoryRow category={category} />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryPicker

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role='img'>{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )
}