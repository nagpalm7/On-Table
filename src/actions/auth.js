"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getDatabaseConnection } from '@/lib/db';
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import Session from "@/model/session";
import User from '@/model/user';

// Signup action
export const signup = async (state, formData) => {
    // validate form data
    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        mobile: formData.get('mobile'),
        userType: formData.get('userType'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            name: formData.get('name'), 
            email: formData.get('email'),
            mobile: formData.get('mobile'),
            userType: formData.get('userType'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { name, email, mobile, userType, password, confirmPassword } = validatedFields.data;

    // Check if user already exists
    await getDatabaseConnection();
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return {
            name, 
            email,
            mobile,
            userType,
            password,
            confirmPassword,
            errors: {
                email: ["Email already exists in our database!"],
            },
        };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, mobile, userType, password: hashedPassword });
    await user.save();

    // Create a session
    await createSession(user._id.toString(), user.userType);

    // Redirect
    redirect(`/auth/login?alertMessage=Registration successful! Please login to continue.`);
};

// Login action
export const login = async (state, formData ) => {
    // validate form data
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            email: formData.get('email'),
            password: formData.get('password'),
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Extract form fields
    const { email, password } = validatedFields.data;

    // Check if user exists
    await getDatabaseConnection();
    const user = await User.findOne({ email });
    if (!user) {
        return {
            email,
            password,
            errors: {
                email: ["Please register with this email before logging in!"],
            },
        };
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return {
            email,
            password,
            errors: {
                password: ["Incorrect password! Please try again."],
            },
        };
    };

    // Create a session
    await createSession(user._id.toString(), user.userType);
    const redirectTo = user.userType === "admin" ? "/admin" : "/restaurant";
    redirect(`${redirectTo}/dashboard`);
};

export async function logout() {
  const cookieStore = await cookies();
  await cookieStore.delete("session");
  redirect("/auth/login");
}
