import * as z from 'zod';

const User = z.object({
  email: z.string(),
  password: z.string(),
});

export { User };
