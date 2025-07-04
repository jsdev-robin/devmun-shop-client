export interface ProductSales {
  month: string;
  sales: number;
}

export interface ProductChange {
  growth: string;
  impact: string;
  sales: ProductSales[];
}

export interface ProductImage {
  alt: string;
  src: string;
}

export interface Product {
  item: string;
  category: string;
  stocks: string;
  sku: string;
  barcode: string;
  price: string;
  salesPerDay: number;
  salesPerMonth: number;
  rating: number;
  totalSales: number;
  revenue: string;
  lastUpdate: string;
  availableIn: string[];
  change: ProductChange;
  img: ProductImage;
}
