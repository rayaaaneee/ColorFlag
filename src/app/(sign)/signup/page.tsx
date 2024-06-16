import { Metadata } from "next";
import SignInComponent from "./_components/signin-component";
import SignUpComponent from "./_components/signup-component";

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