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
          },
          {
            id: 'basicInfo.description',
            accessorKey: 'basicInfo.description',
            header: 'Description',
            cell: (info) => info.getValue(),
          },
          {
            id: 'basicInfo.productType',
            accessorKey: 'basicInfo.productType',
            header: 'Product Type',
            cell: (info) => info.getValue(),
          },
          {
            id: 'basicInfo.productCode',
            accessorKey: 'basicInfo.productCode',
            header: 'Product Code',
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        id: 'inventory',
        header: 'Inventory',
        columns: [
          {
            id: 'inventory.sku',
            accessorKey: 'inventory.sku',
            header: 'SKU',
            cell: (info) => info.getValue(),
          },
          {
            id: 'inventory.barcode',
            accessorKey: 'inventory.barcode',
            header: 'Barcode',
            cell: (info) => info.getValue(),
          },
          {
            id: 'inventory.batchNumber',
            accessorKey: 'inventory.batchNumber',
            header: 'Batch Number',
            cell: (info) => info.getValue(),
          },
          {
            id: 'inventory.expiryDate',
            accessorKey: 'inventory.expiryDate',
            header: 'Expiry Date',
            cell: (info) => info.getValue(),
          },
          {
            id: 'inventory.warehouseLocation',
            accessorKey: 'inventory.warehouseLocation',
            header: 'Warehouse Location',
            cell: (info) => info.getValue(),
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
          },
          {
            id: 'pricing.salePrice',
            accessorKey: 'pricing.salePrice',
            header: 'Sale Price',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.costPrice',
            accessorKey: 'pricing.costPrice',
            header: 'Cost Price',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.priceCurrency',
            accessorKey: 'pricing.priceCurrency',
            header: 'Currency',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.minOrderQuantity',
            accessorKey: 'pricing.minOrderQuantity',
            header: 'Min Order Qty',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.maxOrderQuantity',
            accessorKey: 'pricing.maxOrderQuantity',
            header: 'Max Order Qty',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.taxRate',
            accessorKey: 'pricing.taxRate',
            header: 'Tax Rate',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.taxInclusive',
            accessorKey: 'pricing.taxInclusive',
            header: 'Tax Inclusive',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.taxAmount',
            accessorKey: 'pricing.taxAmount',
            header: 'Tax Amount',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.discountType',
            accessorKey: 'pricing.discountType',
            header: 'Discount Type',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.discountValue',
            accessorKey: 'pricing.discountValue',
            header: 'Discount Value',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.discountStartDate',
            accessorKey: 'pricing.discountStartDate',
            header: 'Discount Start',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.discountEndDate',
            accessorKey: 'pricing.discountEndDate',
            header: 'Discount End',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.shippingCost',
            accessorKey: 'pricing.shippingCost',
            header: 'Shipping Cost',
            cell: (info) => info.getValue(),
          },
          {
            id: 'pricing.shippingCostType',
            accessorKey: 'pricing.shippingCostType',
            header: 'Shipping Cost Type',
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        id: 'categories',
        header: 'Categories',
        columns: [
          {
            id: 'categories.mainCategory',
            accessorKey: 'categories.mainCategory',
            header: 'Main Category',
            cell: (info) => info.getValue(),
          },
          {
            id: 'categories.subCategory',
            accessorKey: 'categories.subCategory',
            header: 'Sub Category',
            cell: (info) => info.getValue(),
          },
          {
            id: 'categories.tertiaryCategory',
            accessorKey: 'categories.tertiaryCategory',
            header: 'Tertiary Category',
            cell: (info) => info.getValue(),
          },
          {
            id: 'categories.productTags',
            accessorKey: 'categories.productTags',
            header: 'Tags',
            cell: (info) => (info.getValue() as string[]).join(', '),
          },
        ],
      },
      {
        id: 'attributes',
        header: 'Attributes',
        columns: [
          {
            id: 'attributes.brand',
            accessorKey: 'attributes.brand',
            header: 'Brand',
            cell: (info) => info.getValue(),
          },
          {
            id: 'attributes.manufacturer',
            accessorKey: 'attributes.manufacturer',
            header: 'Manufacturer',
            cell: (info) => info.getValue(),
          },
          {
            id: 'attributes.model',
            accessorKey: 'attributes.model',
            header: 'Model',
            cell: (info) => info.getValue(),
          },
          {
            id: 'attributes.color',
            accessorKey: 'attributes.color',
            header: 'Color',
            cell: (info) => info.getValue(),
          },
          {
            id: 'attributes.size',
            accessorKey: 'attributes.size',
            header: 'Size',
            cell: (info) => info.getValue(),
          },
          {
            id: 'attributes.material',
            accessorKey: 'attributes.material',
            header: 'Material',
            cell: (info) => info.getValue(),
          },
          {
            id: 'attributes.weight',
            accessorKey: 'attributes.weight',
            header: 'Weight',
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        id: 'shipping',
        header: 'Shipping',
        columns: [
          {
            id: 'shipping.shippingClass',
            accessorKey: 'shipping.shippingClass',
            header: 'Shipping Class',
            cell: (info) => info.getValue(),
          },
          {
            id: 'shipping.isFreeShipping',
            accessorKey: 'shipping.isFreeShipping',
            header: 'Free Shipping',
            cell: (info) => (info.getValue() ? 'Yes' : 'No'),
          },
          {
            id: 'shipping.requiresShipping',
            accessorKey: 'shipping.requiresShipping',
            header: 'Requires Shipping',
            cell: (info) => (info.getValue() ? 'Yes' : 'No'),
          },
        ],
      },
      {
        id: 'seo',
        header: 'SEO',
        columns: [
          {
            id: 'seo.metaTitle',
            accessorKey: 'seo.metaTitle',
            header: 'Meta Title',
            cell: (info) => info.getValue(),
          },
          {
            id: 'seo.metaDescription',
            accessorKey: 'seo.metaDescription',
            header: 'Meta Description',
            cell: (info) => info.getValue(),
          },
          {
            id: 'seo.canonicalUrl',
            accessorKey: 'seo.canonicalUrl',
            header: 'Canonical URL',
            cell: (info) => info.getValue(),
          },
          {
            id: 'seo.keywords',
            accessorKey: 'seo.keywords',
            header: 'Keywords',
            cell: (info) => (info.getValue() as string[]).join(', '),
          },
          {
            id: 'seo.slug',
            accessorKey: 'seo.slug',
            header: 'Slug',
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        id: 'status',
        header: 'Status',
        columns: [
          {
            id: 'status',
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => info.getValue(),
          },
          {
            id: 'isAdult',
            accessorKey: 'isAdult',
            header: 'Adult Content',
            cell: (info) => (info.getValue() ? 'Yes' : 'No'),
          },
        ],
      },
      {
        id: 'dates',
        header: 'Dates',
        columns: [
          {
            id: 'createdAt',
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: (info) =>
              new Date(info.getValue() as string).toLocaleString(),
          },
          {
            id: 'updatedAt',
            accessorKey: 'updatedAt',
            header: 'Updated At',
            cell: (info) =>
              new Date(info.getValue() as string).toLocaleString(),
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
