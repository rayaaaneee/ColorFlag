import { Metadata } from "next";
import SignUpComponent from "./_components/signup-component";
import SignInComponent from "./_components/signin-component";

export const metadata: Metadata = {
    title: "Sign In",
}

const SignIn = () => {
    return (
        <>
            <SignInComponent />
            <SignUpComponent />
        </>
    );
}

export default SignIn;