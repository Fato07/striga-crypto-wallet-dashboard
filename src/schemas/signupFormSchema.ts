import { z } from 'zod';

export const signupFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().nonempty({ message: 'First name cannot be empty' }),
  lastName: z.string().nonempty({ message: 'Last name cannot be empty' }),
  address: z.object({
    addressLine1: z.string().nonempty({ message: 'Address Cannot be empty' }),
    city: z.string().nonempty({ message: 'City Cannot be empty' }),
    country: z.string().nonempty(),
    postalCode: z.string().nonempty({ message: 'Postal Code Cannot be empty' }),
  }),
});
