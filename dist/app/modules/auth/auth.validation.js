"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .min(3)
            .max(255),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6)
            .max(16)
            .refine(password => {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasDigit = /\d/.test(password);
            return hasUpperCase && hasLowerCase && hasDigit;
        }, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.',
        }),
        contactNumber: zod_1.z
            .string({
            required_error: 'Contact Number is required',
        })
            .min(10)
            .max(11),
        address: zod_1.z.string({}).optional(),
        profilePic: zod_1.z.string().optional(),
    }),
});
exports.authValidation = {
    create,
};
