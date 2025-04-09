'use client'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Txn = {
  event: 'MINT' | 'TRANSFER'
  from: string
  to: string
  date: string
  txn: string
}

export const columns: ColumnDef<Txn>[] = [
  {
    accessorKey: 'type.code',
    header: 'Event'
  },
  {
    accessorKey: 'fromAddress',
    header: 'From'
  },
  {
    accessorKey: 'toAddress',
    header: 'To'
  },
  {
    accessorKey: 'transactionDate',
    header: 'Date'
  },
  {
    accessorKey: 'transactionId',
    header: 'View Transaction',
    cell: ({ row }) => (
      <Link
        legacyBehavior
        href={`https://mumbai.polygonscan.com/tx/${row.getValue(
          'transactionId'
        )}`}
        passHref
      >
        <a target='_blank' rel='noopener noreferrer'>
          View
        </a>
      </Link>
    )
  }
]
