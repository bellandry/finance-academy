'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import CreateCategoryDialog from './create-category-dialog'

interface CategoryPickerProps {
  type: TransactionType
  onChange: (value: string) => void
}

function CategoryPicker({ type, onChange }: CategoryPickerProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!value) return
    onChange(value)
  }, [onChange, value])

  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then(res =>
      res.json()
    )
  })

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  )

  const successCallback = useCallback((category: Category) => {
    setValue(category.name)
    setOpen((prev) => !prev)
  }, [setValue, setOpen])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role={'combobox'}
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Selectionnez..."
          )}
          <ChevronsUpDown className='ml-auto h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder='Chercher une catégorie...' />
          <CreateCategoryDialog
            type={type}
            successCallback={successCallback}
          />
          <CommandEmpty>
            <p>Catégorie non trouvée</p>
            <p className="text-xs text-muted-foreground">Créer une catégorie</p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data && categoriesQuery.data.map((category: Category) => (
                <CommandItem
                  key={category.name}
                  onSelect={() => {
                    setValue(category.name)
                    setOpen((prev) => !prev)
                  }}
                >
                  <CategoryRow category={category} />
                  <Check className={cn(
                    "ml-2 w-4 h-4 opacity-0",
                    value === category.name && "opacity-100"
                  )} />
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