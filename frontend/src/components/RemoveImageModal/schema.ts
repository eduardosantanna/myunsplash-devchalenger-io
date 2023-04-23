import { z } from 'zod'

export const schemaFormDeleteImage = z.object({
  passwordImage: z
    .string()
    .min(6, 'Your password must be between 6 and 12 characters long')
    .max(12, 'Your password must be between 6 and 12 characters long'),
})
