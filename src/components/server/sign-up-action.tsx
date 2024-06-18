"use server";

import prisma from "@/lib/prisma";
import type User from "@/utils/interfaces/user";
import ActionReturn from "@/utils/types/action-return";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const SignUpAction = async ({ username, email, password }: User): Promise<ActionReturn> => {

    if (!username) return { msg: "Please enter a valid username", status: "error" };
    if (!email) return { msg: "Please enter a valid email", status: "error" };
    if (!password) return { msg: "Please enter a valid password", status: "error" };

    try {
        const saltRounds: number = 10;
        password = await bcrypt.hash(password, saltRounds);
    } catch (error: any) {
        return { msg: "An error occured while hashing password.", status: "error"}
    }

    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });

        if (!user) return { msg: "An error occured while creating user.", status: "error" };
    } catch (error: any) {
        console.error(error);
        if (error.code === "P2002") {
            return { msg: "Username or email already exists", status: "error" };
        } else {
            return { msg: "An error occured while creating user.", status: "error" };
        }
    } finally {
        await prisma.$disconnect();
    }

    redirect("/play");

};

export default SignUpAction;