"use server";

import prisma from "@/lib/prisma";
import User from "@/useful/interfaces/user";
import bcrypt from "bcrypt";

const SignUp = async ({ username, email, password }: User): User => {

    console.log(username, email, password);
    if (!username) throw new Error("Please enter a valid username");
    if (!email) throw new Error("Please enter a valid email");
    if (!password) throw new Error("Please enter a valid password");

    try {
        password = await bcrypt.hash(password, 10);
    } catch (error: any) {
        throw new Error("An error occurred while hashing the password");
    }

    return { id: "1", username, email, password } as User;
};

export default SignUp;