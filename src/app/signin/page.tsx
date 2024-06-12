import { Metadata } from "next";
import SignUpComponent from "./_components/signup-component";
import SignInComponent from "./_components/signin-component";

export const metadata: Metadata = {
    title: "Sign In",
}

const SignIn = () => {
    return (
        <div className="w-full h-full grid grid-cols-[3fr_1fr]">
            <SignInComponent />
            <SignUpComponent />
        </div>
    );
}

export default SignIn;