import { z } from 'zod'

export const ogImageParamsSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  username: z.string().min(1, { message: 'ユーザー名は必須です' }),
  template: z.enum(['modern', 'simple']).default('modern'),
  iconUrl: z.string().url().optional()
})

export type OGImageParams = z.infer<typeof ogImageParamsSchema> 