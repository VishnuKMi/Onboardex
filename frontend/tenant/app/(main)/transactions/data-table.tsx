'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Pagination } from '@/modules/common/components'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue> ({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 8

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })

  const onPageChange = page => {
    setCurrentPage(page)
  }

  console.log(data)

  return (
    <div>
      <div className='rounded-md border bg-white px-6'>
        <div className='flex justify-between py-4 text-center'>
          <h2 className='text-xl font-semibold'>History</h2>
          <div className='flex items-center justify-end gap-2'>
            <div className='relative flex gap-4'>
              <div className='absolute top-2 left-2 text-gray-600'>
                <Search />
              </div>
              <Input
                placeholder='Search clients'
                value={
                  (table.getColumn('client')?.getFilterValue() as string) ?? ''
                }
                onChange={event =>
                  table.getColumn('client')?.setFilterValue(event.target.value)
                }
                className='max-w-sm pl-10'
              />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead className='text-black' key={header.id}>
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
          <TableBody className='text-gray-600'>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='cursor-pointer hover:bg-gray-200'
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          className='my-6 mx-4'
          itemsPerPage={8}
          totalItems={data.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}
