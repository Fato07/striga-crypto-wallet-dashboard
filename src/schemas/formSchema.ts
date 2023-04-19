import { z } from 'zod';

export const formDataSchema = z.object({
  email: z.string().email(),
  firstName: z
    .string()
    .nonempty()
    .refine(
      (value) => {
        // Custom validation logic for the firstName field
        return value.length >= 2;
      },
      {
        message: 'First name must be at least 2 characters long',
      },
    ),
  lastName: z
    .string()
    .nonempty()
    .refine(
      (value) => {
        // Custom validation logic for the lastName field
        return value.length >= 2;
      },
      {
        message: 'Last name must be at least 2 characters long',
      },
    ),
  address: z.object({
    addressLine1: z.string().nonempty(),
    city: z.string().nonempty(),
    country: z.string().nonempty(),
    postalCode: z.string().nonempty(),
  }),
});
