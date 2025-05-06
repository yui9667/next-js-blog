import { z } from 'zod';
export const postSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Please enter a title of 3 characters or more ' })
    .max(255, { message: 'Please enter a title of 255 characters or less' }),
  content: z
    .string()
    .min(10, { message: 'Please enter a content of 10 characters or more' }),
  topImage: z.instanceof(File).nullable().optional(),
});
