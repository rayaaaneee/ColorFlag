"use server";

import prisma from "@/lib/prisma";
import type User from "@/useful/interfaces/user";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const SignUp = async ({ username, email, password }: User): Promise<never> => {

    if (!username) throw new Error("Please enter a valid username");
    if (!email) throw new Error("Please enter a valid email");
    if (!password) throw new Error("Please enter a valid password");

    try {
        const saltRounds: number = 10;
        password = await bcrypt.hash(password, saltRounds);
    } catch (error: any) {
        throw new Error("An error occurred while hashing the password");
    }

    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });

        if (!user) throw new Error("An error occurred while creating the user");

    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    } finally {
        await prisma.$disconnect();
    }

    redirect("/");
};

export default SignUp;