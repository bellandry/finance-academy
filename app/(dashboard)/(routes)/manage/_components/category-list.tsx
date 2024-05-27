import SkeletonWrapper from '@/components/skeleton-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { TransactionType } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { PlusSquare, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import CreateCategoryDialog from '../../dashboard/_components/create-category-dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'
import CategoryCard from './category-card'

const CategoryList = ({ type }: { type: TransactionType }) => {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then(res => res.json())
  })

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {type === "expense" ? (
                  <TrendingDown className="p-2 h-12 w-12 items-center rounded-lg bg-red-400/10 text-red-500" />
                ) : (
                  <TrendingUp className="p-2 h-12 w-12 items-center rounded-lg bg-emerald-400/10 text-emerald-500" />
                )}
              </div>

              <div>
                Catégories des {type === "income" ? "revenus" : "dépenses"}
                <div className="text-sm text-muted-foreground">
                  Triés par nom
                </div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Ajouter
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              Aucune catégorie pour les{" "}
              <span
                className={cn(
                  "m-1",
                  type === "income" ? "text-emerald-500" : "text-red-500"
                )}            
              >
                {type === "income" ? "revenus" : "dépenses"}
              </span> trouvée
            </p>
            <p className="text-sm text-muted-foreground">
              Créer un catégorie pour commencer
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  )
}

export default CategoryList