import { z } from "zod";

export const orgUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  organisation: z.string(),
});
