"use server";

import prisma from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/schema/user-settings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({
    currency,
  });

  if (!parsedBody.success) {
    throw parsedBody.error;
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.id,
    },
    data: {
      currency,
    },
  });

  await prisma.category.createMany({
    data: [
      {
        userId: user.id,
        name: "Salaire",
        icon: "💼",
        type: "income",
      },
      {
        userId: user.id,
        name: "Nutrition",
        icon: "🍝",
        type: "expense",
      },
      {
        userId: user.id,
        name: "Loyer",
        icon: "🏠",
        type: "expense",
      },
      {
        userId: user.id,
        name: "Taxi",
        icon: "🚕",
        type: "expense",
      },
      {
        userId: user.id,
        name: "Cashback",
        icon: "💸",
        type: "income",
      },
      {
        userId: user.id,
        name: "Santé",
        icon: "💊",
        type: "expense",
      },
    ],
    skipDuplicates: true,
  });

  return userSettings;
}
