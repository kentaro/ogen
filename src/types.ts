import { z } from 'zod'

export const ogImageParamsSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  username: z.string().min(1, { message: 'ユーザー名は必須です' }),
  gradientFrom: z.string().default('#EEF0FF'),
  gradientTo: z.string().default('#FFF0F8'),
  iconUrl: z.string().url().optional()
})

export type OGImageParams = z.infer<typeof ogImageParamsSchema> 