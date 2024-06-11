"use client";

import InputText from "@/components/inputs/input-text";
import Button from "@/components/inputs/button";
import Link from "next/link";
import { FormEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
import AppLogo from "@/components/svg/app-logo";
import HeadingOne from "@/components/usefuls/heading-one";
import Checkbox from "@/components/inputs/checkbox";
import CheckboxContainer from "@/components/usefuls/checkbox-container";
import { FacebookConnectionButton, GithubConnectionButton, GoogleConnectionButton } from "@/components/inputs/custom-connection-button";

export interface SignInComponentProps {

}

const SignInComponent = ({}: SignInComponentProps) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!username) {
          toast.error("Please enter a valid username");
          return;
        }
        if (!password) {
          toast.error("Please enter a valid password");
          return;
        }

        setIsLoading(true);
    }

    return (
        <div className="bg-white bg-opacity-70 flex flex-col items-center justify-center">
            { isLoading ? (
                <AppLogo loaderTransitionDuration={120} className="w-44" asLoader loaderLoop />
            ) : (
                <>
                    <HeadingOne>Sign in to your account</HeadingOne>
                    <p>Login using social networks</p>
                    <div className="flex gap-4 p-3 w-fit h-fit">
                        <GoogleConnectionButton />
                        <FacebookConnectionButton />
                        <GithubConnectionButton />
                    </div>
                    <p>Or</p>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <InputText onChange={(e) => setUsername(e.currentTarget.value)} placeholder="Username" type="username" />
                        <InputText onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Password" type="password" />
                        {/* <div className="flex flex-row gap-2">
                            <Checkbox id="remember-me"></Checkbox>
                            <label htmlFor="remember-me">Remember me</label>
                        </div> */}
                        <CheckboxContainer label="Remember me" id="remember-me" />
                        <Button type="submit" customs={{ colorClass: "bg-main", textColorClass: "text-white", hasTextUpperCase: false }}>Sign In</Button>
                    </form>
                    <Link href="/forgot-password">
                        Forgot password ?
                    </Link>
                </>
            ) }
        </div>
    )
}

export default SignInComponent;