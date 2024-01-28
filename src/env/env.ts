import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
