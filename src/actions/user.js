"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { getDatabaseConnection } from '@/lib/db';
import { RegisterFormSchema } from '@/lib/rules';
import User from '@/model/user';
import { revalidatePath } from "next/cache";

export const fetchUsers = async (userType = null) => {
    await getDatabaseConnection();
    const filter = userType ? { userType } : {};
    const users = await User.find(filter)
        .sort('-updatedAt')
        .select('-password -__v')
        .lean();
    return JSON.parse(JSON.stringify(users));
};

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

export const deleteUser = async (formData) => {
    await getDatabaseConnection();
    const userId = formData.get('id');

    // Remove user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error("User not found");
    }
    // Remove references to this user in restaurants' owners array
    const Restaurant = (await import('@/model/restaurant')).default;
    await Restaurant.updateMany(
        { owners: userId },
        { $pull: { owners: userId } }
    );
    
    // Revalidate the restaurant list page
    revalidatePath(`/admin/user/list`);
};