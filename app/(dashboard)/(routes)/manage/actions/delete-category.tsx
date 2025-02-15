'use server'

import prisma from "@/lib/prisma"
import { DeleteCategorySchema, DeleteCategorySchemaType } from "@/schema/categories"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function DeleteCategory(from: DeleteCategorySchemaType) {
  const parsedBody = DeleteCategorySchema.safeParse(from)
  if (!parsedBody.success) {
    throw new Error('Bad Request !')
  }

  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }

  const { name, type } = parsedBody.data
  const category = await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name: name,
        type: type
      }
    }
  })

  return category
}