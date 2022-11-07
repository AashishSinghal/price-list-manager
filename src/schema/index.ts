import { z } from "zod";

export const formValidationSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  unit: z.string(),
  price: z.string(),
  discount: z.string(),
  image: z.string(),
  business: z.string().min(3),
  createdAt: z.date(),
  updatedAt: z.date(),
});
