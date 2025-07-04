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
import { useGetProductQuery } from '../../../lib/features/products/productEndpoint';
import { Product } from '../../../types/product';

const ProductList = () => {
  const columns = useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        accessorKey: 'stocks',
        id: 'stocks',
        cell: (info) => info.getValue(),
        header: 'Stocks',
        meta: {
          filterVariant: 'range',
        },
      },

      {
        accessorFn: (row) => row.sku,
        accessorKey: 'sku',
        id: 'sku',
        cell: (info) => info.getValue(),
        header: 'Sku',
        meta: {
          filterVariant: 'number',
        },
      },
      {
        accessorFn: (row) => row.barcode,
        accessorKey: 'barcode',
        id: 'barcode',
        cell: (info) => info.getValue(),
        header: 'Barcode',
        meta: {
          filterVariant: 'number',
        },
      },
      {
        accessorFn: (row) => row.price,
        accessorKey: 'price',
        id: 'price',
        cell: (info) => info.getValue(),
        header: 'Price',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorFn: (row) => row.salesPerDay,
        accessorKey: 'salesPerDay',
        id: 'salesPerDay',
        cell: (info) => info.getValue(),
        header: 'Daily Sales',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorFn: (row) => row.salesPerMonth,
        accessorKey: 'salesPerMonth',
        id: 'salesPerMonth',
        cell: (info) => info.getValue(),
        header: 'Monthly Sales',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorFn: (row) => row.totalSales,
        accessorKey: 'totalSales',
        id: 'totalSales',
        cell: (info) => info.getValue(),
        header: 'Total Sales',
        meta: {
          filterVariant: 'number',
        },
      },
    ],
    [],
  );
  const { data, isError, isLoading, isFetching } = useGetProductQuery({});

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
