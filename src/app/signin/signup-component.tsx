import Button from "@/components/inputs/button";
import Link from "next/link";

export interface SignupComponentProps {
    
}

const SignUpComponent = ({}: SignupComponentProps) => {
  return (
    <div className="bg-main text-white p-5 flex flex-col items-center justify-center text-center gap-4">
    <h1 className="font-bold bg">New Here ?</h1>
    <p>Sign up and discover a new way to learn and master the world</p>
        <Link href="/signup">
            <Button customs={{ colorClass: "bg-white", textColorClass: "text-main", hasTextUpperCase: false }}>Sign Up</Button>
        </Link>
    </div>
  )
}

export default SignUpComponent;