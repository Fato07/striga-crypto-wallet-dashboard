import { z } from 'zod';

export const kycFormSchema = z.object({
  occupation: z.string().nonempty({ message: 'Occupation cannot be empty' }),
  sourceOfFunds: z.string().nonempty({ message: 'Source Of Funds is empty' }),
  sourceOfFundsOther: z.string().max(80, {
    message: 'Source of Funds (Other) must be 80 characters or less',
  }),
  selfPepDeclaration: z.boolean(),
  purposeOfAccount: z
    .string()
    .nonempty({ message: 'Purpose of Account is empty' }),
  purposeOfAccountOther: z.string().max(80, {
    message: 'Purpose of Account (Other) must be 80 characters or less',
  }),
  expectedOutgoingTxVolumeYearly: z
    .string()
    .nonempty({ message: 'Expected Outgoing Volume Yearly is empty' }),
  expectedIncomingTxVolumeYearly: z
    .string()
    .nonempty({ message: 'Expected Incoming Volume Yearly is empty' }),
  ipAddress: z.string().nonempty({ message: 'IP Address is empty' }),
  placeOfBirth: z.string().nonempty({ message: 'Place of Birth is empty' }),
});
