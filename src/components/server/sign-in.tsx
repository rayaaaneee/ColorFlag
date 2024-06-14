"use server";

import prisma from "@/lib/prisma";
import User from "@/useful/interfaces/user";

import bcrypt from "bcrypt";

const SignIn = async ({ username, password }: User): User => {

    console.log(username, password);
    if (!username) throw new Error("Please enter a valid username");
    if (!password) throw new Error("Please enter a valid password");

    const cryptedPassword: string = await bcrypt.hash(password, 10);

    try {
    
        const result: boolean = await bcrypt.compare(password, cryptedPassword);

        if (!result) throw new Error("Passwords do not match");

    } catch (error: any) {

        throw new Error("An error occurred while comparing the passwords");
    
    }

    return { id: "1", username, password } as User;
};

export default SignIn;