"use client";

import Button from "@/components/inputs/button";
import { FacebookConnectionButton, GithubConnectionButton, GoogleConnectionButton } from "@/components/inputs/custom-connection-button";
import InputText from "@/components/inputs/input-text";
import Bar from "@/components/usefuls/bar";
import CheckboxContainer from "@/components/usefuls/checkbox-container";
import { HeadingOne, HeadingThree, HeadingTwo } from "@/components/usefuls/headings";
import { FormEvent, FormEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
import LeftSide from "../../_components/left-side";
import SignLoader from "../../_components/sign-loader";

export interface SignUpComponentProps {

}

const SignUpComponent = ({}: SignUpComponentProps) => {

    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const confirmPasswordInput = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const onSignUp: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {

        if (!usernameInput.current || !emailInput.current || !passwordInput.current || !confirmPasswordInput.current) {
            toast.error("An unexpected error occurred, please try again later");
            return;
        }

        e.preventDefault();
        if (!usernameInput.current.value) {
            toast.error("Please enter a valid username");
            return;
        }
        if (!emailInput.current.value) {
            toast.error("Please enter a valid email");
            return;
        }
        if (!passwordInput.current.value) {
            toast.error("Please enter a valid password");
            return;
        }
        if (!confirmPasswordInput.current.value) {
            toast.error("Please confirm your password");
            return;
        }
        if (passwordInput.current.value !== confirmPasswordInput.current.value) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
    }

    return (
        <LeftSide>
            { isLoading ? (
                <SignLoader />
            ) : (
                <>
                    <HeadingOne className="font-bold">Create an account</HeadingOne>
                    <HeadingTwo className="italic">Start your journey with us !</HeadingTwo>
                    <form onSubmit={onSignUp} className="flex flex-col gap-4 p-3 w-[600px] h-fit">
                        <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-2 w-full gap-4">
                            <InputText className="col-span-2" mainColor size="xl"  ref={usernameInput} placeholder="Username" type="username" />
                            <InputText className="col-span-4" mainColor size="xl"  ref={emailInput} placeholder="Email" type="email" />
                            <InputText className="col-span-3" mainColor size="xl" ref={passwordInput} placeholder="Password" type="password" />
                            <InputText className="col-span-3" mainColor size="xl" ref={confirmPasswordInput} placeholder="Confirm password" type="password" />
                        </div>
                        <CheckboxContainer size="lg" label="Remember me" id="remember-me" />
                        <Button type="submit" className="bg-main text-white rounded-full text-md my-2">Sign Up</Button>
                        <Bar barClassName="border-gray-400 w-1/4">
                            <HeadingThree className="mb-0 font-semibold text-gray-400">Or with</HeadingThree>
                        </Bar>
                        <div className="flex gap-4 p-3 items-center justify-center w-full h-fit">
                            <GoogleConnectionButton />
                            <FacebookConnectionButton />
                            <GithubConnectionButton />
                        </div>
                    </form>
                </>
            ) }
        </LeftSide>
    )
}

export default SignUpComponent;
