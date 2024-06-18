"use client";

import Button from "@/components/inputs/button";
import { FacebookConnectionButton, GithubConnectionButton, GoogleConnectionButton } from "@/components/inputs/custom-connection-button";
import InputText from "@/components/inputs/input-text";
import SignIn from "@/components/server/sign-in";
import Bar from "@/components/usefuls/bar";
import CheckboxContainer from "@/components/usefuls/checkbox-container";
import CustomLink from "@/components/usefuls/custom-link";
import { HeadingOne, HeadingThree, HeadingTwo } from "@/components/usefuls/headings";
import type User from "@/useful/interfaces/user";
import { useState, type FormEventHandler } from "react";
import toast from "react-hot-toast";
import LeftSide from "../../_components/left-side";
import SignLoader from "../../_components/sign-loader";

export interface SignInComponentProps {

}

const SignInComponent = ({}: SignInComponentProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();

        const form: HTMLFormElement = e.currentTarget;
        const formData: FormData = new FormData(form);

        const username: string = formData.get("username") as string;
        const password: string = formData.get("password") as string;

        if (!username) {
          toast.error("Please enter a valid username");
          return;
        }
        if (!password) {
          toast.error("Please enter a valid password");
          return;
        }

        setIsLoading(true);

        try {
            await SignIn({ username, password } as User);
        } catch (error: any) {
            toast.error(error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <LeftSide>
            { isLoading ? (
                <SignLoader />
            ) : (
                <>
                    <HeadingOne className={"text-center font-bold"}>Sign in to your account</HeadingOne>
                    <HeadingTwo className="italic">Login using social networks</HeadingTwo>
                    <div className="flex gap-4 w-fit h-fit">
                        <GoogleConnectionButton />
                        <FacebookConnectionButton />
                        <GithubConnectionButton />
                    </div>
                    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-72">
                        <Bar barClassName="border-gray-400">
                            <HeadingThree className="mb-0 font-semibold text-gray-400">Or</HeadingThree>
                        </Bar>
                        <InputText size="xl" mainColor name="username" placeholder="Username" type="username" />
                        <InputText size="xl" mainColor name="password" placeholder="Password" type="password" />
                        <CheckboxContainer size="lg" label="Remember me" id="remember-me" />
                        <Button type="submit" className="bg-main text-white rounded-full text-md">Sign In</Button>
                        <CustomLink href="/forgot-password">Forgot password ?</CustomLink>
                    </form>
                </>
            ) }
        </LeftSide>
    )
}

export default SignInComponent;