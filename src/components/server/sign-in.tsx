"use server";

import prisma from "@/lib/prisma";
import User from "@/useful/interfaces/user";


const SignIn = async ({ username, password }: User): Promise<User> => {

    console.log(username, password);
    if (!username) throw new Error("Please enter a valid username");
    if (!password) throw new Error("Please enter a valid password");

    const user: User = prisma.user.findUnique({ where: { username } }) satisfies User;

    return { id: "1", username, password } as User;
};

export default SignIn;