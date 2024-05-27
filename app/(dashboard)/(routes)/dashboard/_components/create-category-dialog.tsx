'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories'
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleOff, Loader2, PlusSquare } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ReactNode, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CreateCategory } from '../_actions/categories'

interface CreateCategoryDialogProps {
  type: TransactionType
  successCallback: (Category: Category) => void
  trigger?: ReactNode
}

function CreateCategoryDialog({ type, successCallback, trigger }: CreateCategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type
    }
  })

  const queryClient = useQueryClient()
  const theme = useTheme()

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form.reset({
        name: '',
        icon: '',
        type
      })

      toast.success(`Catégorie ${data.name} créee avec succès`, {
        id: "create-category"
      })

      successCallback(data)

      await queryClient.invalidateQueries({
        queryKey: ['categories']
      })

      setOpen((prev) => !prev)

    },
    onError: () => {
      toast.error("Une erreur inatendue s'est produite", {
        id: "create-category"
      })
    }
  })

  const onSubmit = useCallback((values: CreateCategorySchemaType) => {
    toast.loading("Création de la catégorie", {
      id: "create-category"
    })
    mutate(values)
  }, [mutate])

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        { trigger ? trigger : <Button
          variant={'ghost'}
          className='flex border-separate items-center justify-start rounded-none border-b p-3 text-muted-foreground'
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          Créer une catégorie
        </Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Créer une catégorie de
            <span
              className={cn(
                "mr-1",
                type === "income" ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {type === "income" ? " revenu" : " dépense"}
            </span>
          </DialogTitle>
          <DialogDescription>
            Les catégories sont utilisées pour grouper vos transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder='Catégorie' {...field} />
                  </FormControl>
                  <FormDescription>
                    Nom de la catégorie
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icone</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className='h-[100px] w-full'
                        >
                          {form.watch("icon") ? (
                            <div className='flex flex-col items-center gap-2'>
                              <span className='text-5xl' role='img'>
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Cliquez pour changer
                              </p>
                            </div>
                          ) : (
                            <div className='flex flex-col items-center gap-2'>
                              <CircleOff className="flex flex-col items-center gap-2" />
                              <p className="text-xs text-muted-foreground">
                                Cliquez pour sélectionner
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Picker
                          data={data}
                          theme={theme.resolvedTheme}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Choisissez un émoji pour facilement distinguer la catégorie
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='button'
              variant={'secondary'}
              onClick={() => {
                form.reset()
              }}
            >
              Annuler
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending ? "Créer" : (
              <Loader2 className='animate-spin' />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategoryDialog