import { getTransactionsHistoryResponseType } from '@/app/api/transactions-history/route'
import { DateToUTCDate } from '@/lib/helpers'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { 
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SkeletonWrapper from '@/components/skeleton-wrapper'
import { DataTableColumnHeader } from '@/components/datatable/column-header'
import { cn } from '@/lib/utils'


interface TransactionTableProps {
  from: Date
  to: Date
}

const emptyData: any[] = []

type TransactionHistoryRow = getTransactionsHistoryResponseType[0]

export const columns: ColumnDef<TransactionHistoryRow>[] = [
  {
    accessorKey: "category",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Catégorie" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 capitalize">
        {row.original.categoryIcon}
        <div className="capitalize">
          {row.original.category}
        </div>
      </div>
    )
  },
  {
    accessorKey: "description",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.description}
      </div>
    )
  },
  {
    accessorKey: "date",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const formattedDate = date.toLocaleDateString("default", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "2-digit"
      })
      return <div className="text-muted-foreground"> {formattedDate} </div>
    }
  },
  {
    accessorKey: "type",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Type de transaction" />
    ),
    cell: ({ row }) => (
      <div className={cn(
        "capitalize rounded-md text-center p-2",
        row.original.type === "income" && "bg-emerald-400/10 text-emerald-500",
        row.original.type === "expense" && "bg-red-400/20 text-red-500"
      )}>
        {row.original.type === "income" ? "Revenus" : "Dépense"}
      </div>
    )
  },
  {
    accessorKey: "amount",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Montant" />
    ),
    cell: ({ row }) => (
      <p className="capitalize rounded-md text-center p-2 font-medium bg-gray-400/5">
        {row.original.formattedAmount}
      </p>
    )
  }
]

const TransactionTable = ({ from, to }: TransactionTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const history = useQuery<getTransactionsHistoryResponseType>({
    queryKey: ["transactions", "history", from, to],
    queryFn: () => fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`)
      .then(res => res.json()) 
  })

  const table = useReactTable({
    data: history.data || emptyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div className="w-full">
      <div className='flex flex-wrap items-end justify-between gap-2 py-4'>

      </div>
      <SkeletonWrapper isLoading={history.isFetching}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </SkeletonWrapper>
    </div>
  )
}

export default TransactionTable