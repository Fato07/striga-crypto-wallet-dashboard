import { z } from 'zod';

export const UserStateSchema = z.object({
  isLoggedIn: z.boolean(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  mobile: z.object({
    countryCode: z.string(),
    number: z.string(),
  }),
  address: z.object({
    addressLine1: z.string().nonempty(),
    city: z.string().nonempty(),
    country: z.string().nonempty(),
    postalCode: z.string().nonempty(),
  }),
});
