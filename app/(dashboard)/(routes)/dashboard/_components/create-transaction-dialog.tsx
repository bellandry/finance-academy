'use client'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ReactNode, useCallback, useState } from "react"
import { useForm } from "react-hook-form"

interface CreateTransactionDialogProps {
  trigger: ReactNode
  type: TransactionType
}

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DateToUTCDate } from "@/lib/helpers"
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CalendarIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { CreateTransaction } from "../_actions/transactions"
import CategoryPicker from "./category-picker"

function CreateTransactionDialog({ trigger, type }: CreateTransactionDialogProps) {
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date()
    }
  })

  const [open, setOpen] = useState(false)

  const handleCategoryChange = useCallback((value: string) => {
    form.setValue('category', value)
  }, [form])

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,
    onSuccess: () => {
      toast.success("Transaction ajoutée avec succès !", {
        id: "create-transaction"
      })

      form.reset({
        type,
        description: "",
        amount: 0,
        date: new Date(),
        category: undefined,
      })

      queryClient.invalidateQueries({
        queryKey: ["overview"]
      })

      setOpen((prev) => !prev)
    }
  })

  const onSubmit = useCallback((values: CreateTransactionSchemaType) => {
    toast.loading("Ajout de la transaction en cours", {
      id: "create-transaction"
    })

    mutate({
      ...values,
      date: DateToUTCDate(values.date)
    })
  }, [mutate])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>
              Ajouter une nouvelle
              <span className={cn(
                "m-1",
                type === 'income' ? 'text-emerald-500' : 'text-rose-500'
              )}>
                {type === 'income' ? "entrée" : 'dépense'}
              </span>
            </p>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field} />
                  </FormControl>
                  <FormDescription>
                    Description de la transaction ( optionnel )
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Montant de la transaction
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-1 justify-between">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 flex flex-col gap-1">
                    <FormLabel>Catégorie</FormLabel>
                    <FormControl>
                      <CategoryPicker type={type} onChange={handleCategoryChange} />
                    </FormControl>
                    <FormDescription>
                      Sélectionnez une catégorie pour cette transaction ( optionnel )
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 flex flex-col gap-1">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Sélectionnez une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Sélectionnez la date correspondant à la transaction
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

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

export default CreateTransactionDialog