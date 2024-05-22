'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"

interface CreateTransactionDialogProps {
  trigger: ReactNode
  type: TransactionType
}

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction"
import CategoryPicker from "./category-picker"

function CreateTransactionDialog({ trigger, type }: CreateTransactionDialogProps) {
  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date()
    }
  })

  return (
    <Dialog>
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
          <form className="space-y-4">
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

            <div className="flex items-center gap-2 justify-between">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <FormControl>
                      <CategoryPicker type={type} />
                    </FormControl>
                    <FormDescription>
                      Sélectionnez une catégorie pour cette transaction ( optionnel )
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTransactionDialog