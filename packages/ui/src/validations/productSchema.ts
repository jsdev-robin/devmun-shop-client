import { z } from 'zod';

export const productSchema = z.object({
  basicInfo: z.object({
    title: z
      .string()
      .min(1, 'Product title is required')
      .max(100, 'Title too long'),
    description: z
      .string()
      .max(3000, 'Description should be at least 3000 characters'),
    productType: z.enum(['physical', 'digital', 'service', 'bundle'], {
      required_error: 'Product type is required',
    }),
    productCode: z.string().min(1, 'Product code is required'),
  }),

  inventory: z.object({
    sku: z
      .string()
      .min(1, 'SKU is required')
      .max(50, 'SKU cannot exceed 50 characters'),
    barcode: z
      .string()
      .max(50, 'Barcode cannot exceed 50 characters')
      .optional(),
    batchNumber: z.string().optional(),
    expiryDate: z.date().optional(),
    warehouseLocation: z.string().optional(),
  }),

  pricing: z.object({
    basePrice: z.coerce.number().min(0.01, 'Base price must be at least 0.01'),
    salePrice: z.coerce
      .number()
      .min(0, 'Sale price must be at least 0')
      .optional(),
    costPrice: z.coerce
      .number()
      .min(0, 'Cost price must be at least 0')
      .optional(),
    priceCurrency: z.string().optional(),
    minOrderQuantity: z.coerce
      .number()
      .min(1, 'Minimum order quantity must be at least 1')
      .optional(),

    maxOrderQuantity: z.coerce
      .number()
      .min(1, 'Maximum order quantity must be at least 1')
      .optional(),
    taxRate: z.coerce
      .number()
      .max(100, 'Tax rate cannot exceed 100%')
      .optional(),
    taxInclusive: z
      .enum(['include', 'exclude'], {
        required_error: 'Tax calculation method is required',
      })
      .optional(),
    taxAmount: z.coerce.number().optional(),
    discountType: z.enum(['fixed', 'percentage']).optional(),
    discountValue: z.coerce.number().optional(),
    discountStartDate: z.date().optional(),
    discountEndDate: z.date().optional(),
    shippingCost: z.coerce.number(),
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

  // digitalProduct: z
  //   .object({
  //     downloadUrl: z.string().url().optional(),
  //     downloadLimit: z.coerce.number().optional(),
  //     licenseKey: z.string().optional(),
  //     fileSize: z.coerce.number().optional(),
  //     fileType: z.string().optional(),
  //   })
  //   .optional(),

  variants: z
    .array(
      z.object({
        sku: z.string().min(1, 'Variant SKU is required'),
        color: z.string().optional(),
        size: z.string().optional(),
        price: z.coerce
          .number()
          .min(0.01, 'Variant price must be at least 0.01'),
        costPrice: z.coerce
          .number()
          .min(0, 'Variant cost price must be at least 0')
          .optional(),
        salePrice: z.coerce
          .number()
          .min(0, 'Variant sale price must be at least 0')
          .optional(),
        stockQuantity: z.coerce.number(),
        barcode: z.string().optional(),
        weight: z.coerce.number().optional(),
        // dimensions: z
        //   .object({
        //     length: z.coerce.number().optional(),
        //     width: z.coerce.number().optional(),
        //     height: z.coerce.number().optional(),
        //     unit: z.enum(['cm', 'in', 'm']),
        //   })
        //   .optional(),
        isActive: z.boolean(),
      }),
    )
    .optional(),

  // media: z.object({
  //   mainImage: z.string().url('Main image must be a valid URL'),
  //   additionalImages: z.array(z.string().url()).optional(),
  //   videoUrl: z.string().url().optional(),
  //   altText: z.string().optional(),
  // }),

  shipping: z
    .object({
      dimensions: z
        .object({
          length: z.coerce.number().optional(),
          width: z.coerce.number().optional(),
          height: z.coerce.number().optional(),
          unit: z.enum(['cm', 'in', 'm']),
        })
        .optional(),
      shippingClass: z.string().optional(),
      isFreeShipping: z.boolean(),
      requiresShipping: z.boolean(),
    })
    .optional(),

  seo: z
    .object({
      metaTitle: z
        .string()
        .max(60, 'Meta title should be ≤60 characters')
        .optional(),
      metaDescription: z
        .string()
        .max(160, 'Meta description should be ≤160 characters')
        .optional(),
      // slug: z
      //   .string()
      //   .regex(
      //     /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      //     'Slug must be URL-friendly (lowercase, hyphens)',
      //   )
      //   .optional(),
      canonicalUrl: z.string().url().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),

  status: z.enum(['draft', 'active', 'archived']),

  isAdult: z.boolean(),

  // metadata: z.record(z.string(), z.any()).optional(),
});
