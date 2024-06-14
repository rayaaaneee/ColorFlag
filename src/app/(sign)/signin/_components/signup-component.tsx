import Button from "@/components/inputs/button";
import Bar from "@/components/usefuls/bar";
import { HeadingThree, HeadingTwo } from "@/components/usefuls/headings";
import Link from "next/link";
import RightSide from "../../_components/right-side";

export interface SignupComponentProps {
    
}

const SignUpComponent = ({}: SignupComponentProps) => {
  return (
    <RightSide>
        <HeadingTwo className="font-bold text-white">New Here ?</HeadingTwo>
        <HeadingThree className="text-gray-200">Sign up and discover a new way to learn and master the world</HeadingThree>
        <Link href="/signup">
            <Button className="bg-white text-main rounded-full text-md">Sign Up</Button>
        </Link>
    </RightSide>
  )
}

export default SignUpComponent;