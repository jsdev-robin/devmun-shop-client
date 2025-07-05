'use client';

import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import MunGrid from '@repo/ui/data-grid/mun-grid';
import IndeterminateCheckbox from '@repo/ui/components/IndeterminateCheckbox';
import { Person } from '../../../types/person';
import { useGetPersonsQuery } from '../../../lib/features/person/personEndpoints';

const ProductList = () => {
  const columns = useMemo<ColumnDef<Person, unknown>[]>(
    () => [
      {
        accessorFn: (_row, index) => index + 1,
        cell: ({ row }) => row.index + 1,
        id: 'rowNumber',
        header: '',
        size: 54,
        maxSize: 54,
        enableColumnFilter: false,
      },
      {
        id: 'drag-handle',
        // cell: ({ row }) => <RowDragHandle rowId={row.id} />,
        size: 36,
      },
      {
        id: 'pin',
        header: () => 'Pin',
        // cell: ({ row }) => <RowPin row={row} />,
        size: 60,
        maxSize: 60,
      },
      {
        id: 'select',
        header: ({ table }) => (
          <div>
            <IndeterminateCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
              aria-label="Select row"
            />
          </div>
        ),
        size: 40,
        maxSize: 40,
        enableColumnFilter: false,
      },
      {
        id: 'hello',
        header: () => <span>Hello</span>,
        columns: [
          {
            id: 'firstName',
            accessorKey: 'firstName',
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
            meta: { filterVariant: 'text' },
            enableHiding: false,
          },
          {
            id: 'lastName',
            accessorFn: (row) => row.lastName,
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
            meta: { filterVariant: 'text' },
          },
          {
            id: 'createdAt',
            accessorFn: (row) => row.createdAt,
            cell: (info) => info.getValue(),
            header: () => <span>createdAt</span>,
            footer: (props) => props.column.id,
            meta: { filterVariant: 'dateRange' },
          },
          {
            id: 'email',
            accessorFn: (row) => row.email,
            cell: (info) => info.getValue(),
            header: () => <span>email</span>,
            footer: (props) => props.column.id,
            meta: { filterVariant: 'text' },
          },
          {
            id: 'phone',
            accessorFn: (row) => row.phone,
            cell: (info) => info.getValue(),
            header: () => <span>phone</span>,
            footer: (props) => props.column.id,
            meta: { filterVariant: 'text' },
          },
          {
            id: 'address',
            accessorFn: (row) => row.address,
            cell: (info) => info.getValue(),
            header: () => <span>address</span>,
            footer: (props) => props.column.id,
            meta: { filterVariant: 'text' },
          },
        ],
      },
      {
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
          {
            id: 'age',
            accessorKey: 'age',
            header: () => 'Age',
            footer: (props) => props.column.id,
            meta: { filterVariant: 'range' },
          },
          {
            header: 'More Info',
            columns: [
              {
                id: 'visits',
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
                meta: { filterVariant: 'text' },
              },
              {
                id: 'status',
                accessorKey: 'status',
                header: 'Status',
                footer: (props) => props.column.id,
                meta: { filterVariant: 'select' },
              },
              {
                id: 'progress',
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: (props) => props.column.id,
                meta: { filterVariant: 'text' },
              },
              {
                id: 'rank',
                accessorKey: 'rank',
                header: 'Profile rank',
                footer: (props) => props.column.id,
                meta: { filterVariant: 'text' },
              },
              {
                id: 'isVerified',
                accessorKey: 'isVerified',
                header: 'Profile isVerified',
                footer: (props) => props.column.id,
                meta: { filterVariant: 'text' },
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  const { data, isError, isLoading, isFetching } = useGetPersonsQuery({});

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <MunGrid
              data={data?.data}
              columns={columns}
              isError={isError}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProductList;
