import { z } from "zod";

export const loginDetails = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginDetails = z.infer<typeof loginDetails>;
