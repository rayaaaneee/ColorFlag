import Button from "@/components/inputs/button";
import { HeadingThree, HeadingTwo } from "@/components/usefuls/headings";
import Link from "next/link";
import RightSide from "../../_components/right-side";

export interface SignInComponentProps {
    
}

const SignInComponent = ({}: SignInComponentProps) => {
  return (
    <RightSide>
        <HeadingTwo className="font-bold text-white">Already have an account ?</HeadingTwo>
        <HeadingThree className="text-gray-200">Sign in and discover a new way to learn and master the world</HeadingThree>
        <Link href="/signin">
            <Button className="bg-white text-main font-medium rounded-full text-md">Sign In</Button>
        </Link>
    </RightSide>
  )
}

export default SignInComponent;