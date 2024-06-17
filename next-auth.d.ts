import User from "@/useful/interfaces/user";
import "next-auth";

declare module "next-auth" { 
    interface Session {
        user: User;
    }
}