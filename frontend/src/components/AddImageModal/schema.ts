import { z } from 'zod'

export const schemaForm = z.object({
  label: z
    .string()
    .min(3, 'Label must be more than 3 characters')
    .max(20, 'Label must be less than 20 characters'),
  imageUrl: z.string().url('The url must be of an image'),
  passwordImage: z
    .string()
    .min(6, 'Your password must be between 6 and 12 characters long')
    .max(12, 'Your password must be between 6 and 12 characters long'),
})
