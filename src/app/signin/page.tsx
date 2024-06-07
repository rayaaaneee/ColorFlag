import Button from "@/components/inputs/button";
import AppLogo from "@/components/svg/app-logo";
import { Metadata } from "next";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";
import ConnectionButton from "./connection-button";

export const metadata: Metadata = {
    title: "Sign In",
}

const SignIn = () => {
    return (
        <div className="w-full h-full grid grid-cols-[3fr_1fr]">
            <div className="bg-white bg-opacity-70 flex flex-col items-center justify-center">
                <AppLogo className="w-44" asLoader loaderLoop />
                <h1>Sign in to your account</h1>
                <p>Login using social networks</p>
                <div className="flex gap-4 p-3 w-fit h-fit">
                    <ConnectionButton colorClassName="bg-red-500" hoverColorClassName="hover:bg-red-600"><FaGoogle className="w-1/3 h-1/3" /></ConnectionButton>
                    <ConnectionButton colorClassName="bg-blue-900" hoverColorClassName="hover:bg-blue-950"><FaFacebookF className="w-1/3 h-1/3" /></ConnectionButton>
                    <ConnectionButton colorClassName="bg-main" hoverColorClassName="hover:bg-black"><TbBrandGithubFilled className="w-2/5 h-2/5" /></ConnectionButton>
                </div>
                <p>Or</p>
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Email" className="p-2 border border-black rounded-lg" />
                    <input type="password" placeholder="Password" className="p-2 border border-black rounded-lg" />
                    <Button customs={{ colorClass: "bg-main", textColorClass: "text-white", hasTextUpperCase: false }}>Sign In</Button>
                </form>
                <Link href="/forgot-password">
                    Forgot password ?
                </Link>

            </div>
            <div className="bg-main text-white p-5 flex flex-col items-center justify-center text-center gap-4">
                <h1 className="font-bold bg">New Here ?</h1>
                <p>Sign up and discover a new way to learn and master the world</p>
                <Link href="/signup">
                    <Button customs={{ colorClass: "bg-white", textColorClass: "text-main", hasTextUpperCase: false }}>Sign Up</Button>
                </Link>
            </div>
        </div>
    );
}

export default SignIn;