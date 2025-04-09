'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  name: string
  mints: number
  purchases: number
  transfers: number
  users: {
    isActive: 'Enabled' | 'Disabled'
  }
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Client'
  },
  {
    accessorKey: 'mints',
    header: 'Mints'
  },
  {
    accessorKey: 'purchases',
    header: 'Purchases'
  },
  {
    accessorKey: 'transfers',
    header: 'Transfers'
  },
  {
    accessorKey: 'users.isActive',
    header: 'Status',
    cell: ({ row }) => {
      console.log(row.original.users[0].isActive)
      const isActive = row.original.users[0].isActive
      return isActive ? 'Enabled' : 'Disabled'
    }
  }
]
