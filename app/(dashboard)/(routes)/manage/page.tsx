"use client";

import { CurrencyComboBox } from "@/components/currency-combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryList from "./_components/category-list";

const Manage = () => {
  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Gérer</p>
            <p className="text-muted-foreground">
              Gérez les paramètres de votre comptes et les catégories de
              transactions
            </p>
          </div>
        </div>
      </div>
      <div className="md:container px-4 flex flex-col gap-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>Devise</CardTitle>
            <CardDescription>
              Votre devise par défaut pour vos transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </>
  );
};

export default Manage;
