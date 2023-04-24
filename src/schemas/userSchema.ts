import { z } from 'zod';

export const UserStateSchema = z.object({
  isLoggedIn: z.boolean(),
  email: z.string().email(),
  userId: z.string().uuid().optional(),
  firstName: z.string(),
  lastName: z.string(),
  KYC: z
    .object({
      emailVerified: z.boolean(),
      mobileVerified: z.boolean(),
      status: z.string(),
    })
    .optional(),
  emailVerification: z
    .object({
      dateExpires: z.string(),
    })
    .optional(),
  mobileVerification: z
    .object({
      dateExpires: z.string(),
    })
    .optional(),
  mobile: z.object({
    countryCode: z.string(),
    number: z.string(),
  }),
  address: z.object({
    addressLine1: z.string(),
    city: z.string(),
    country: z.string(),
    postalCode: z.string(),
  }),
  missingFields: z.array(z.string()).optional(),
});
