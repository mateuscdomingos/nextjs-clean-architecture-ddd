import { z } from 'zod';

const ROAST_LEVELS = ['light', 'medium', 'dark'] as const;

export const newProductSchema = z.object({
  name: z.string().min(3, 'minNameLength'),
  roast: z.enum(ROAST_LEVELS).superRefine((val, ctx) => {
    if (!ROAST_LEVELS.includes(val)) {
      ctx.addIssue({
        code: 'custom',
        message: 'invalidRoast',
      });
    }
  }),
  priceInCents: z.number().min(1, 'minPrice'),
  stockQuantity: z.number().min(0, 'minStock'),
  minimumStockQuantity: z.number().min(0, 'minMinStock'),
  unit: z.string().min(1, 'unitRequired'),
});

export type ProductInput = z.infer<typeof newProductSchema>;
