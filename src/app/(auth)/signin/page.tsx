import { type Metadata } from "next";
import SignInComponent from "./_components/signin-component";
import SignUpComponent from "./_components/signup-component";

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