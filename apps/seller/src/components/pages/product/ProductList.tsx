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
      },
      {
        accessorKey: 'category',
        id: 'category',
        cell: (info) => info.getValue(),
        header: 'Category',
      },
      {
        accessorKey: 'stocks',
        id: 'stocks',
        cell: (info) => info.getValue(),
        header: 'Stocks',
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
      },
      {
        accessorKey: 'salesPerDay',
        id: 'salesPerDay',
        cell: (info) => info.getValue(),
        header: 'Daily Sales',
      },
      {
        accessorKey: 'salesPerMonth',
        id: 'salesPerMonth',
        cell: (info) => info.getValue(),
        header: 'Monthly Sales',
      },
      {
        accessorKey: 'rating',
        id: 'rating',
        cell: (info) => info.getValue(),
        header: 'Rating',
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
      },
      {
        accessorKey: 'lastUpdate',
        id: 'lastUpdate',
        cell: (info) => info.getValue(),
        header: 'Last Update',
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
