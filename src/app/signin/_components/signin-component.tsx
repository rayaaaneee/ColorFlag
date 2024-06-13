"use client";

import InputText from "@/components/inputs/input-text";
import Button from "@/components/inputs/button";
import { FormEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
import AppLogo from "@/components/svg/app-logo";
import { HeadingOne, HeadingThree, HeadingTwo } from "@/components/usefuls/headings";
import CheckboxContainer from "@/components/usefuls/checkbox-container";
import { FacebookConnectionButton, GithubConnectionButton, GoogleConnectionButton } from "@/components/inputs/custom-connection-button";
import CustomLink from "@/components/usefuls/custom-link";
import Paragraph from "@/components/usefuls/paragraph";
import Bar from "@/components/usefuls/bar";

export interface SignInComponentProps {

}

const SignInComponent = ({}: SignInComponentProps) => {

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!usernameInput.current?.value) {
          toast.error("Please enter a valid username");
          return;
        }
        if (!passwordInput.current?.value) {
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
                    <HeadingOne className={"text-center font-bold"}>Sign in to your account</HeadingOne>
                    <HeadingTwo className="italic">Login using social networks</HeadingTwo>
                    <div className="flex gap-4 p-3 w-fit h-fit">
                        <GoogleConnectionButton />
                        <FacebookConnectionButton />
                        <GithubConnectionButton />
                    </div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-72">
                        <Bar barClassName="border-gray-400">
                            <HeadingThree className="mb-0 font-semibold" colorClass="text-gray-400">Or</HeadingThree>
                        </Bar>
                        <InputText size="xl" mainColor ref={usernameInput} placeholder="Username" type="username" />
                        <InputText size="xl" mainColor ref={passwordInput} placeholder="Password" type="password" />
                        <CheckboxContainer size="lg" label="Remember me" id="remember-me" />
                        <Button type="submit" customs={{ colorClass: "bg-main", textColorClass: "text-white", hasTextUpperCase: false, borderRadiusClass: "rounded-full", fontSizeClass: "text-md" }}>Sign In</Button>
                        <CustomLink href="/forgot-password">Forgot password ?</CustomLink>
                    </form>
                </>
            ) }
        </div>
    )
}

export default SignInComponent;