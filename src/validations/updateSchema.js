import { z } from "zod";

export const updateFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  body: z
    .string()
    .min(10, "Body must be at least 10 characters")
    .max(2000, "Body must be less than 2000 characters"),
  images: z.array(z.file()).optional(),
});

export default updateFormSchema;
