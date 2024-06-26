"use client";

import Button from "@/components/inputs/button";
import { FacebookConnectionButton, GithubConnectionButton, GoogleConnectionButton } from "@/components/inputs/custom-connection-button";
import InputText from "@/components/inputs/input-text";
import SignInAction from "@/components/server/sign-in-action";
import Bar from "@/components/utils/bar";
import CheckboxContainer from "@/components/utils/checkbox-container";
import CustomLink from "@/components/utils/custom-link";
import { HeadingOne, HeadingThree, HeadingTwo } from "@/components/utils/headings";
import ActionReturn from "@/utils/types/action-return";
import { useState, type FormEventHandler } from "react";
import toast from "react-hot-toast";
import LeftSide from "../../_components/left-side";
import SignLoader from "../../_components/sign-loader";

export interface SignInComponentProps {

}

const SignInComponent = ({ }: SignInComponentProps) => {

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

        const action: ActionReturn = await SignInAction("credentials", formData);
        if (action) {
            if (action.status === "error") {
                toast.error(action.msg);
            } else {
                toast.success(action.msg);
            }
        }
        setIsLoading(false);
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
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-72">
                        <Bar barClassName="border-gray-400">
                            <HeadingThree className="mb-0 font-semibold text-gray-400">Or</HeadingThree>
                        </Bar>
                        <InputText size="xl" mainColor name="username" placeholder="Username" type="username" />
                        <InputText size="xl" mainColor name="password" placeholder="Password" type="password" />
                        <CheckboxContainer size="lg" label="Remember me" id="remember-me" />
                        <Button type="submit" tooltipClassName="w-full" className=" w-full bg-main text-white rounded-full font-medium">Sign In</Button>
                        <CustomLink href="/forgot-password" className="self-end">Forgot password ?</CustomLink>
                    </form>
                </>
            ) }
        </LeftSide>
    )
}

export default SignInComponent;