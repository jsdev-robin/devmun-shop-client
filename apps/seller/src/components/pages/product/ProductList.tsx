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
        accessorKey: 'item',
        id: 'item',
        cell: (info) => info.getValue(),
        header: 'Item',
        meta: {
          filterVariant: 'text',
        },
      },
      {
        accessorKey: 'category',
        id: 'category',
        cell: (info) => info.getValue(),
        header: 'Category',
        meta: {
          filterVariant: 'text',
        },
      },
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
        accessorKey: 'sku',
        id: 'sku',
        cell: (info) => info.getValue(),
        header: 'Sku',
        meta: {
          filterVariant: 'number',
        },
      },
      {
        accessorKey: 'barcode',
        id: 'barcode',
        cell: (info) => info.getValue(),
        header: 'Barcode',
        meta: {
          filterVariant: 'number',
        },
      },
      {
        accessorKey: 'price',
        id: 'price',
        cell: (info) => info.getValue(),
        header: 'Price',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'salesPerDay',
        id: 'salesPerDay',
        cell: (info) => info.getValue(),
        header: 'Daily Sales',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'salesPerMonth',
        id: 'salesPerMonth',
        cell: (info) => info.getValue(),
        header: 'Monthly Sales',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'rating',
        id: 'rating',
        cell: (info) => info.getValue(),
        header: 'Rating',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'totalSales',
        id: 'totalSales',
        cell: (info) => info.getValue(),
        header: 'Total Sales',
        meta: {
          filterVariant: 'number',
        },
      },
      {
        accessorKey: 'revenue',
        id: 'revenue',
        cell: (info) => info.getValue(),
        header: 'Revenue',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'lastUpdate',
        id: 'lastUpdate',
        cell: (info) => info.getValue(),
        header: 'Last Update',
        meta: {
          filterVariant: 'date',
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
