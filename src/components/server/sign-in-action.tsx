"use server";

import { signIn } from "@/lib/auth";
import type ActionReturn from "@/utils/types/action-return";
import { AuthError } from "next-auth";

const SignInAction = async (provider: string, formData: FormData): Promise<ActionReturn> => {
    "use server";
    try {
        const result: never = await signIn(provider, formData);
    } catch (error: any) { 
        if (error instanceof AuthError) {
            switch (error.type) { 
                case "CredentialsSignin":
                    return { msg: "Invalid password", status: "error" };
                default:
                    if (error.message === "NotFound") {
                        return { msg: "User not found", status: "error" };
                    }
                    return { msg: "An error occurred while signing in", status: "error" };
            }
        } else {
            return { msg: "An error occurred while signing in", status: "error" };
        }
    }
    return { msg: "Signed in successfully", status: "success" };
}

export default SignInAction;