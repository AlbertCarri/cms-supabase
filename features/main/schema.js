import { z } from "zod";

export const restoNameSchema = z.object({
  restoName: z.string().max(20).min(1),
});
