import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { productSchema } from '../validations/productSchema';

type ProductForm = UseFormReturn<z.infer<typeof productSchema>>;

export const generateSKU = (form: ProductForm) => {
  const title = form.getValues('basicInfo.title');
  const productType = form.getValues('basicInfo.productType');

  const shortTitle = title
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .substring(0, 10);

  const typeCode = productType.slice(0, 3).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `${typeCode}-${shortTitle}-${random}`;
};
