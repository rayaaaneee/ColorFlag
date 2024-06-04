import Button from "@/components/inputs/button";
import AppLogo from "@/components/svg/app-logo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign In",
}

const SignIn = () => {
    return (
        <div className="w-full h-full grid grid-cols-[3fr_1fr]">
            <div className="bg-white bg-opacity-70 flex flex-col items-center justify-center">
                <AppLogo asLoader={true} loaderLoop={true} loaderTransitionDuration={100} className="w-28" />
                <h1>Sign in to your account</h1>
                <p>Login using social networks</p>
                <div className="flex gap-4">
                    <Button customs={{ colorClass: "bg-main", textColorClass: "text-white" }}>Google</Button>
                    <Button customs={{ colorClass: "bg-main", textColorClass: "text-white" }}>Facebook</Button>
                    <Button customs={{ colorClass: "bg-main", textColorClass: "text-white" }}>Github</Button>
                </div>
                <p>Or use your email</p>
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Email" className="p-2 border border-black rounded-lg" />
                    <input type="password" placeholder="Password" className="p-2 border border-black rounded-lg" />
                    <Button customs={{ colorClass: "bg-main", textColorClass: "text-white" }}>Sign In</Button>
                </form>
                <Link href="/forgot-password">
                    Forgot password ?
                </Link>

            </div>
            <div className="bg-main text-white p-5 flex flex-col items-center justify-center text-center gap-4">
                <h1 className="font-bold bg">New Here ?</h1>
                <p>Sign up and discover a new way to learn and master the world</p>
                <Link href="/signup">
                    <Button customs={{ colorClass: "bg-white", textColorClass: "text-main" }}>Sign Up</Button>
                </Link>
            </div>
        </div>
    );
}

export default SignIn;