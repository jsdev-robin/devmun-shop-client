'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import QuillEditor from '@repo/ui/components/quill-editor';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import Combobox from '@repo/ui/components/combobox';
import DatePicker from '@repo/ui/components/date-picker';
import { Button } from '@repo/ui/components/button';
import { productSchema } from '@repo/ui/validations/productSchema';
import { productType } from '@repo/ui/data/dummyProductFields';
import { generateSKU } from '@repo/ui/utils/sku';
import { generateBarcode } from '@repo/ui/utils/barcode';
import { dummyCurrency } from '@repo/ui/data/dummyCurrency';
import { dummyCategory } from '@repo/ui/data/dummyCategory';
import { dummyBrands } from '@repo/ui/data/dummyBrands';
import { dummySize } from '@repo/ui/data/dummySize';
import TagInput from '@repo/ui/components/tag-input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { Trash } from 'lucide-react';
import { Textarea } from '@repo/ui/components/textarea';
import { Separator } from '@repo/ui/components/separator';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Radio } from '@repo/ui/components/radio';
import { cn } from '@repo/ui/lib/utils';
import ProductMedia from './particles/ProductMedia';

const ProductCreate = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      basicInfo: {
        title: '',
        description: '',
        productType: 'physical',
        productCode: '',
      },
      inventory: {
        sku: '',
        barcode: '',
        batchNumber: '',
        expiryDate: undefined,
        warehouseLocation: '',
      },
      pricing: {
        basePrice: undefined,
        salePrice: undefined,
        costPrice: undefined,
        priceCurrency: 'USD',
        minOrderQuantity: 1,
        maxOrderQuantity: undefined,
        taxRate: undefined,
        taxInclusive: 'include',
        taxAmount: undefined,
        discountType: 'fixed',
        discountValue: undefined,
        discountStartDate: undefined,
        discountEndDate: undefined,
        shippingCost: undefined,
        shippingCostType: 'fixed',
      },

      categories: {
        mainCategory: '',
        subCategory: '',
        tertiaryCategory: '',
        productTags: [],
      },

      attributes: {
        brand: '',
        manufacturer: '',
        model: '',
        color: '',
        size: '',
        material: '',
        weight: undefined,
        dimensions: {
          length: undefined,
          width: undefined,
          height: undefined,
          unit: 'cm',
        },
        warranty: {
          period: undefined,
          unit: undefined,
          terms: '',
        },
      },
      variants: [],
      shipping: {
        dimensions: {
          length: undefined,
          width: undefined,
          height: undefined,
          unit: 'cm',
        },
        shippingClass: '',
        isFreeShipping: false,
        requiresShipping: true,
      },
      seo: {
        metaTitle: '',
        metaDescription: '',
        canonicalUrl: '',
        keywords: [],
      },
      status: 'active',
      isAdult: false,
    },
  });

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    alert(JSON.stringify(data, null, 2));
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  const addNewVariant = () => {
    append({
      sku: '',
      color: '',
      size: '',
      price: 0,
      costPrice: undefined,
      salePrice: undefined,
      stockQuantity: 0,
      barcode: '',
      weight: undefined,
      isActive: true,
    });
  };

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <ProductMedia />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Inforamtion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="basicInfo.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              Descriptive titles work best. Try to describe your
                              item the way a buyer would search for it.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="basicInfo.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <QuillEditor {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              Try to answer the questions buyers will have. Tell
                              the item&apos;s story and explain why it&apos;s
                              special.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="basicInfo.productType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Type</FormLabel>
                              <FormControl>
                                <Combobox
                                  defaultValue={field.value}
                                  options={productType}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                              <FormDescription>
                                Choose whether your item is physical, digital, a
                                service, or a bundle of products.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="basicInfo.productCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              <FormDescription>
                                Enter a unique code to identify this product
                                (e.g., SKU or internal reference).
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Invendory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5">
                      <FormField
                        control={form.control}
                        name="inventory.sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onFocus={() => {
                                  form.setValue(
                                    'inventory.sku',
                                    generateSKU(form),
                                    {
                                      shouldValidate: true,
                                    },
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inventory.barcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bardcode (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onFocus={() => {
                                  form.setValue(
                                    'inventory.barcode',
                                    generateBarcode(),
                                    {
                                      shouldValidate: true,
                                    },
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inventory.batchNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Batch Number (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inventory.expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date (Optional)</FormLabel>
                            <FormControl>
                              <DatePicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inventory.warehouseLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warehouse Location (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      <FormField
                        control={form.control}
                        name="pricing.basePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base price</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.salePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sale price (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.costPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost price (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.priceCurrency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <FormControl>
                              <Combobox
                                defaultValue={field.value}
                                options={dummyCurrency}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.minOrderQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum order qty (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.maxOrderQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum order qty (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.taxInclusive"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax calculation (Optional)</FormLabel>
                            <FormControl>
                              <Combobox
                                defaultValue={field.value}
                                options={[
                                  {
                                    value: 'include',
                                    label: 'Include',
                                  },
                                  {
                                    value: 'exclude',
                                    label: 'Exclude',
                                  },
                                ]}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.taxAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax Ammout (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.discountType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount type (Optional)</FormLabel>
                            <FormControl>
                              <Combobox
                                defaultValue={field.value}
                                options={[
                                  {
                                    value: 'fixed',
                                    label: 'Fixed',
                                  },
                                  {
                                    value: 'percentage',
                                    label: 'Percentage',
                                  },
                                ]}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.discountValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount value (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.discountStartDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Start (Optional)</FormLabel>
                            <FormControl>
                              <DatePicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.discountEndDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount End (Optional)</FormLabel>
                            <FormControl>
                              <DatePicker
                                onChange={field.onChange}
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.shippingCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipping cost</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pricing.shippingCostType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shipping Cost Type</FormLabel>
                            <FormControl>
                              <Combobox
                                defaultValue={field.value}
                                options={[
                                  {
                                    value: 'fixed',
                                    label: 'Fixed',
                                  },
                                  {
                                    value: 'calculated',
                                    label: 'Calculated',
                                  },
                                ]}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="categories.mainCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Combobox
                                defaultValue={field.value}
                                options={dummyCategory}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="categories.subCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub Category</FormLabel>
                            <FormControl>
                              <Combobox
                                defaultValue={field.value}
                                options={dummyCategory}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="categories.tertiaryCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tertiary Category (Optinal)</FormLabel>
                            <FormControl>
                              <Combobox
                                defaultValue={field.value}
                                options={dummyCategory}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="categories.productTags"
                        render={({ field }) => (
                          <FormItem className="md:col-span-full">
                            <FormLabel>Tags (Optinal)</FormLabel>
                            <FormControl>
                              <TagInput
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Attributes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                      <FormField
                        control={form.control}
                        name="attributes.brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                              <Combobox options={dummyBrands} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="attributes.manufacturer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manufacturer (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="attributes.model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="attributes.color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color (Optional)</FormLabel>
                            <FormControl>
                              <Input type="color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="attributes.size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size (Optional)</FormLabel>
                            <FormControl>
                              <Combobox options={dummySize} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="attributes.material"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Material (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <FormField
                        control={form.control}
                        name="attributes.weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                      <div className="col-span-full">
                        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle>Dimensions (Optional)</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                                <FormField
                                  control={form.control}
                                  name="attributes.dimensions.length"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Length</FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="attributes.dimensions.width"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Width</FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="attributes.dimensions.height"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Height</FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="attributes.dimensions.unit"
                                  render={({ field }) => (
                                    <FormItem className="md:col-span-3">
                                      <FormLabel>Unit</FormLabel>
                                      <FormControl>
                                        <Combobox
                                          options={[
                                            {
                                              value: 'cm',
                                              label: 'Centimeters',
                                            },
                                            { value: 'in', label: 'Inches' },
                                            { value: 'm', label: 'Meters' },
                                          ]}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardTitle>Warranty (Optional)</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                                <FormField
                                  control={form.control}
                                  name="attributes.warranty.period"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Period</FormLabel>
                                      <FormControl>
                                        <Input type="number" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="attributes.warranty.unit"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Unit</FormLabel>
                                      <FormControl>
                                        <Combobox
                                          options={[
                                            { value: 'days', label: 'Days' },
                                            {
                                              value: 'months',
                                              label: 'Months',
                                            },
                                            { value: 'years', label: 'Years' },
                                          ]}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="attributes.warranty.terms"
                                  render={({ field }) => (
                                    <FormItem className="md:col-span-3">
                                      <FormLabel>Terms</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Variants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Cost Price</TableHead>
                            <TableHead>Sale Price</TableHead>
                            <TableHead>Stock Qty</TableHead>
                            <TableHead>Barcode</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fields.map((field, index) => (
                            <TableRow key={field.id}>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.sku`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Input
                                        {...field}
                                        onFocus={() => {
                                          form.setValue(
                                            `variants.${index}.sku`,
                                            generateSKU(form),
                                            {
                                              shouldValidate: true,
                                            },
                                          );
                                        }}
                                        className="w-full min-w-16"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.color`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Input
                                        type="color"
                                        {...field}
                                        className="w-full min-w-16"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.size`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Combobox
                                        options={dummySize}
                                        {...field}
                                        className="w-40"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.price`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        className="w-full min-w-16"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.costPrice`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        className="w-full min-w-16"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.salePrice`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        className="w-full min-w-16"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.stockQuantity`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        className="w-full min-w-16"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell>
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.barcode`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className="w-full min-w-16"
                                      />
                                    </FormControl>
                                  )}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => remove(index)}
                                  type="button"
                                >
                                  <Trash />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="ml-auto"
                        onClick={addNewVariant}
                        type="button"
                      >
                        Add Variant
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Engine Optimization (SEO)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="seo.metaTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="seo.metaDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meta Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="seo.canonicalUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Canonical Url</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="seo.keywords"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>keywords</FormLabel>
                              <FormControl>
                                <TagInput
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder="Add keywords"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping (Optional)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                          <FormField
                            control={form.control}
                            name="shipping.dimensions.length"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Length</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shipping.dimensions.width"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Width</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shipping.dimensions.height"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Height</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="attributes.dimensions.unit"
                            render={({ field }) => (
                              <FormItem className="md:col-span-3">
                                <FormLabel>Unit</FormLabel>
                                <FormControl>
                                  <Combobox
                                    options={[
                                      {
                                        value: 'cm',
                                        label: 'Centimeters',
                                      },
                                      { value: 'in', label: 'Inches' },
                                      { value: 'm', label: 'Meters' },
                                    ]}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Separator />
                        <FormField
                          control={form.control}
                          name="shipping.shippingClass"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Shipping Class</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="shipping.isFreeShipping"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  id="isFreeShipping"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel htmlFor="isFreeShipping">
                                Free Shipping
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="shipping.requiresShipping"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  id="requiresShipping"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel htmlFor="requiresShipping">
                                Requires Shipping
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Product Status & Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <div className="flex items-center gap-3">
                              {[
                                { value: 'draft', label: 'Draft' },
                                { value: 'active', label: 'Active' },
                                { value: 'archived', label: 'Archived' },
                              ].map((item) => (
                                <div
                                  key={item.value}
                                  className="flex items-center gap-2"
                                >
                                  <Radio
                                    id={`status-${item.value}`}
                                    checked={field.value === item.value}
                                    onChange={() => field.onChange(item.value)}
                                  />
                                  <FormLabel htmlFor={`status-${item.value}`}>
                                    {item.label}
                                  </FormLabel>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isAdult"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                id="isAdult"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor="isAdult"
                              className={cn(field.value && 'text-destructive')}
                            >
                              This product contains adult content
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="flex items-center gap-4 justify-end">
                  <Button
                    type="button"
                    onClick={() => form.reset()}
                    variant="destructive"
                  >
                    Reset
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ProductCreate;
