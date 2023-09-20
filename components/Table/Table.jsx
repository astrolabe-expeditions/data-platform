'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Button } from '../ui/Button/Button'
import { Edit, Trash } from '../ui/Icons'

export default function BasicTable({
  data,
  columns,
  editFunction,
  removeFunction,
}) {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })

  const returnCellTable = function (cell) {
    var cellType = cell.column.columnDef.cellType

    if (cellType === 'multi-select') {
      var objectName = cell.column.columnDef.objectName
      var objectLabel = cell.column.columnDef.objectLabel

      return (
        <td key={cell.id}>
          {cell.row.original[objectName].map((obj) => (
            <Button label={obj[objectLabel]} variant="tag"></Button>
          ))}
        </td>
      )
    } else if (cellType === 'select') {
      return (
        <td key={cell.id} class="whitespace-nowrap px-6 py-4">
          <Button
            label={cell.row.original.type}
            variant="tag"
            disabled={true}></Button>
        </td>
      )
    } else {
      return (
        <td key={cell.id} class="whitespace-nowrap px-6 py-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      )
    }
  }

  return (
    <div>
      {/* <input className='border-color: rgb(0 0 0);'
          type='text'
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
        /> */}
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-md font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          scope="col"
                          class="px-6 py-4">
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {
                                { asc: ' 🔼', desc: ' 🔽' }[
                                  header.column.getIsSorted() ?? null
                                ]
                              }
                            </div>
                          )}
                        </th>
                      ))}
                      <th>Edit</th>
                      <th>Remove</th>
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      {row
                        .getVisibleCells()
                        .map((cell) => returnCellTable(cell))}
                      <td class="whitespace-nowrap px-6 py-4">
                        <Button
                          label={'Edit'}
                          startIcon={Edit}
                          variant="tag"
                          onClick={(e) =>
                            removeFunction(row.original.id)
                          }></Button>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <Button
                          label={'Remove'}
                          startIcon={Trash}
                          variant="tag"></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <Button
          label={'First Page'}
          onClick={() => table.setPageIndex(0)}
          size="sm"
          variant="secondary"></Button>
        <Button
          label={'Previous Page'}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="sm"
          variant="secondary"></Button>
        <Button
          label={'Next Page'}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          variant="secondary"></Button>
        <Button
          label={'Last Page'}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          size="sm"
          variant="secondary"></Button>
      </div>
    </div>
  )
}
