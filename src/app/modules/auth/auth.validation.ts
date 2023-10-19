import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3)
      .max(255),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6)
      .max(16)
      .refine(
        password => {
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasDigit = /\d/.test(password);
          return hasUpperCase && hasLowerCase && hasDigit;
        },
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one digit.',
        }
      ),

    contactNumber: z
      .string({
        required_error: 'Contact Number is required',
      })
      .min(10)
      .max(11),
    address: z.string({}).optional(),
    profilePic: z.string().optional(),
  }),
});

export const authValidation = {
  create,
};
