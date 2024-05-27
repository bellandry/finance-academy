import { Category } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { toast } from 'sonner'
import { DeleteCategory } from '../../dashboard/_actions/categories'
import { TransactionType } from '@/lib/types'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface DeleteCategoryDialogProps {
  trigger: ReactNode
  category: Category
}

const DeleteCategoryDialog = ({ trigger, category }: DeleteCategoryDialogProps) => {
  const categoryIdentifier = `${category.name}-${category.type}`
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Catégorie supprimée", {
        id: categoryIdentifier
      })

      await queryClient.invalidateQueries({
        queryKey: ['categories']
      })
    },
    onError: () => {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard", {
        id: categoryIdentifier
      })
    }
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes vous vraiment sûre ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible, et supprimera définitivement la catégorie {category.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Suppression en cours...", {
                id: categoryIdentifier
              })
              deleteMutation.mutate({
                name: category.name,
                type: category.type as TransactionType
              })
            }}
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCategoryDialog