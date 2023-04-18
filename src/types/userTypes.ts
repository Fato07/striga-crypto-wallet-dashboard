import { z } from 'zod';
import { UserStateSchema } from '../schemas/userSchema';


export type UserState = z.infer<typeof UserStateSchema>;
