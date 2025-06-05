"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getDatabaseConnection } from '@/lib/db';
import { RegisterFormSchema } from '@/lib/rules';
import User from '@/model/user';

export const fetchUsers = async (userType = null) => {
    await getDatabaseConnection();
    const query = userType ? { userType: userType } : {};
    const users = await User.find(query).sort({ updatedAt: -1 }).select("-password -__v");
    return JSON.parse(JSON.stringify(users));
}

export const addUser = async (state, formData) => {
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

    // Redirect
    redirect(`/admin/user/list`);
};
