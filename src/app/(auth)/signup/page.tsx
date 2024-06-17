import { Metadata } from "next";
import SignUpComponent from "./_components/signup-component";
import SignInComponent from "./_components/signin-component";

export const metadata: Metadata = {
    title: "Sign Up",
}

const Page = () => {

    return (
        <>
            <SignUpComponent />
            <SignInComponent />
        </>
    );
}

export default Page;