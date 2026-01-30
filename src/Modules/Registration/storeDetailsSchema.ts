import { z } from 'zod';

export const storeDetailsSchema = z.object({
  storeName: z.string()
    .min(1, 'Store name is required')
    .min(2, 'Store name must be at least 2 characters')
    .max(100, 'Store name must not exceed 100 characters'),
  
  ownerName: z.string()
    .min(1, 'Owner / Manager name is required')
    .min(2, 'Owner name must be at least 2 characters')
    .max(100, 'Owner name must not exceed 100 characters'),
  
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Invalid phone number format'),
  
  address: z.string()
    .optional()
    .default(''),
});

export type StoreDetailsFormData = z.infer<typeof storeDetailsSchema>;
