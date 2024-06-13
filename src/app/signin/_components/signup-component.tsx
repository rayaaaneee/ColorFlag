import Button from "@/components/inputs/button";
import Bar from "@/components/usefuls/bar";
import { HeadingThree, HeadingTwo } from "@/components/usefuls/headings";
import Link from "next/link";

export interface SignupComponentProps {
    
}

const SignUpComponent = ({}: SignupComponentProps) => {
  return (
    <div className="bg-main text-white p-5 flex flex-col items-center justify-center text-center gap-4">
        <HeadingTwo className="font-bold" colorClass="text-white">New Here ?</HeadingTwo>
        <HeadingThree colorClass="text-gray-200">Sign up and discover a new way to learn and master the world</HeadingThree>
        <Link href="/signup">
            <Button customs={{ colorClass: "bg-white", textColorClass: "text-main", hasTextUpperCase: false, borderRadiusClass: "rounded-full", fontSizeClass: "text-md" }}>Sign Up</Button>
        </Link>
    </div>
  )
}

export default SignUpComponent;