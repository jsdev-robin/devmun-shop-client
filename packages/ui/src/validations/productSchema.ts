import { z } from 'zod';

export const productSchema = z.object({
  basicInfo: z.object({
    title: z
      .string()
      .min(1, 'Product title is required')
      .max(100, 'Title too long'),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(3000, 'Description too long'),
    productType: z.enum(['physical', 'digital', 'service', 'bundle'], {
      required_error: 'Product type is required',
    }),
    productCode: z.string().min(1, 'Product code is required'),
  }),

  inventory: z.object({
    sku: z.string().min(1, 'SKU is required').max(50, 'SKU too long'),
    barcode: z.string().max(50).optional(),
    batchNumber: z.string().optional(),
    expiryDate: z.date().optional(),
    warehouseLocation: z.string().optional(),
  }),

  pricing: z.object({
    basePrice: z.coerce.number().min(0.01, 'Base price is required'),
    shippingCost: z.coerce.number().min(0, 'Shipping cost is required'),

    // Optional
    salePrice: z.coerce.number().min(0).optional(),
    costPrice: z.coerce.number().min(0).optional(),
    priceCurrency: z.string().optional(),
    minOrderQuantity: z.coerce.number().min(1).optional(),
    maxOrderQuantity: z.coerce.number().min(1).optional(),
    taxRate: z.coerce.number().max(100).optional(),
    taxInclusive: z.enum(['include', 'exclude']).optional(),
    taxAmount: z.coerce.number().optional(),
    discountType: z.enum(['fixed', 'percentage']).optional(),
    discountValue: z.coerce.number().optional(),
    discountStartDate: z.date().optional(),
    discountEndDate: z.date().optional(),
    shippingCostType: z.enum(['fixed', 'calculated']).optional(),
  }),

  categories: z.object({
    mainCategory: z.string().min(1, 'Main category is required'),
    subCategory: z.string().min(1, 'Subcategory is required'),
    tertiaryCategory: z.string().optional(),
    productTags: z.array(z.string()).optional(),
  }),

  attributes: z.object({
    brand: z.string().min(1, 'Brand is required'),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    color: z.string().optional(),
    size: z.string().optional(),
    material: z.string().optional(),
    weight: z.coerce.number().optional(),
    dimensions: z
      .object({
        length: z.coerce.number().optional(),
        width: z.coerce.number().optional(),
        height: z.coerce.number().optional(),
        unit: z.enum(['cm', 'in', 'm']),
      })
      .optional(),
    warranty: z
      .object({
        period: z.coerce.number().optional(),
        unit: z.enum(['days', 'months', 'years']).optional(),
        terms: z.string().optional(),
      })
      .optional(),
  }),

  variants: z
    .array(
      z.object({
        sku: z.string().min(1, 'Variant SKU is required'),
        price: z.coerce.number().min(0.01, 'Variant price is required'),
        stockQuantity: z.coerce.number(),
        isActive: z.boolean(),

        color: z.string().optional(),
        size: z.string().optional(),
        costPrice: z.coerce.number().min(0).optional(),
        salePrice: z.coerce.number().min(0).optional(),
        barcode: z.string().optional(),
        weight: z.coerce.number().optional(),
      }),
    )
    .optional(),

  shipping: z
    .object({
      isFreeShipping: z.boolean(),
      requiresShipping: z.boolean(),
      shippingClass: z.string().optional(),
      dimensions: z
        .object({
          length: z.coerce.number().optional(),
          width: z.coerce.number().optional(),
          height: z.coerce.number().optional(),
          unit: z.enum(['cm', 'in', 'm']),
        })
        .optional(),
    })
    .optional(),

  seo: z
    .object({
      metaTitle: z.string().max(60).optional(),
      metaDescription: z.string().max(160).optional(),
      canonicalUrl: z.string().url().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),

  status: z.enum(['draft', 'active', 'archived']),
  isAdult: z.boolean(),
});
