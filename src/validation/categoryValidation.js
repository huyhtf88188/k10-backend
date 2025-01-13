import * as z from "zod";

const categoryValidation = z.object({
  title: z.string().min(6),
  description: z.string().optional(),
});

export default categoryValidation;
