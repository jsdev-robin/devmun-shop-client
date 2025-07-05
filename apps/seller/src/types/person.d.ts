export interface Person {
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  rank: number;
  createdAt: string;
  subRows?: Person[];
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
}
