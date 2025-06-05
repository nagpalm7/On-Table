import 'server-only';
import { z } from "zod";

// Login
export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z.string().min(1, { message: "Password is required." }).trim(),
});

// User Registration
export const RegisterFormSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Name is required." })
            .trim(),
        email: z.string().email({ message: "Please enter a valid email." }).trim(),
        mobile: z
            .string()
            .min(10, { message: "Mobile number must be at least 10 digits." })
            .max(10, { message: "Mobile number must not exceed 10 digits." })
            .regex(/^[0-9]+$/, { message: "Mobile number must contain only digits." })  
            .trim(),
        userType: z.enum(["admin", "user", "rest_owner"], {
            message: "Please select a valid user type.",
        }),
        password: z
            .string()
            .min(1, { message: "Not be empty" })
            .min(5, { message: "Be at least 5 characters long" })
            .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
            .regex(/[0-9]/, { message: "Contain at least one number." })
            .trim(),
        confirmPassword: z.string().trim(),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password fields do not match.",
                path: ["confirmPassword"],
            });
        }
    });

// Restaurant Registration
export const RestaurantFormSchema = z.object({
    name: z.string().min(1, { message: "Restaurant name is required." }).trim(),
    location: z.string().min(1, { message: "Location is required." }).trim(),
    owners: z
        .array(z.string())
        .min(1, { message: "At least one owner must be selected." }),
});