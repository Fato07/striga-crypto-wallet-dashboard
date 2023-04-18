import { z } from 'zod';

export const UserStateSchema = z.object({
  isLoggedIn: z.boolean(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});