'use client';

import React, { useMemo, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import MunTable from '@repo/ui/data-grid/mun-table';
import IndeterminateCheckbox from '@repo/ui/components/IndeterminateCheckbox';

import { useReadMyAllQuery } from '../../../../../lib/features/services/hub/seller/product/sellerProductApi';
import { IProduct } from '@repo/ui/types/product-types';
import { buildQueryParams } from '@repo/ui/utils/buildQueryParams';
import RowDragHandle from '@repo/ui/components/row-drag-handle';
import RowPin from '@repo/ui/components/row-pin';
import { Fab } from '@repo/ui/components/fab';
import { Edit, Eye, Trash } from 'lucide-react';

const SellerProductList = () => {
  const columns = useMemo<ColumnDef<IProduct, unknown>[]>(
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
        cell: ({ row }) => <RowDragHandle rowId={row.id} />,
        size: 36,
      },
      {
        id: 'pin',
        header: () => 'Pin',
        cell: ({ row }) => <RowPin row={row} />,
        size: 60,
        maxSize: 60,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <div className="flex items-center gap-4">
            <Fab variant="outline" size="xs">
              <Eye />
            </Fab>
            <Fab variant="outline" size="xs">
              <Edit />
            </Fab>
            <Fab variant="destructive" size="xs">
              <Trash />
            </Fab>
          </div>
        ),
        size: 140,
        maxSize: 140,
        enableColumnFilter: false,
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
        id: 'basicInfo',
        header: 'Basic Info',
        columns: [
          {
            id: 'basicInfo.title',
            accessorKey: 'basicInfo.title',
            header: 'Title',
            cell: (info) => info.getValue(),
            enableHiding: false,
            meta: {
              filterVariant: 'text',
            },
          },
          {
            id: 'basicInfo.description',
            accessorKey: 'basicInfo.description',
            header: 'Description',
            cell: (info) => (
              <span title={info.getValue()}>{info.getValue()}</span>
            ),
            meta: {
              filterVariant: 'text',
            },
          },
          {
            id: 'basicInfo.productType',
            accessorKey: 'basicInfo.productType',
            header: 'Product Type',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'select',
            },
          },
          {
            id: 'basicInfo.productCode',
            accessorKey: 'basicInfo.productCode',
            header: 'Product Code',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'text',
            },
          },
        ],
      },
      {
        id: 'pricing',
        header: 'Pricing',
        columns: [
          {
            id: 'pricing.basePrice',
            accessorKey: 'pricing.basePrice',
            header: 'Base Price',
            cell: (info) => info.getValue(),
            meta: {
              filterVariant: 'range',
            },
          },
        ],
      },
    ],
    [],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const queryParams = buildQueryParams(columnFilters);

  const { data, isError, isLoading, isFetching } = useReadMyAllQuery({
    pagination,
    queryParams,
  });

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle translate="yes">Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <MunTable
              data={data?.data}
              columns={columns}
              isError={isError}
              isLoading={isLoading || isFetching}
              pagination={pagination}
              setPagination={setPagination}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SellerProductList;
