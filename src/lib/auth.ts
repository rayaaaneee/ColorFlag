import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthError } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const {auth, handlers, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    pages: {
        signIn: "/signin",
        newUser: "/signup"
    },
    callbacks: {
        redirect: async ({ url, baseUrl }) => {
          return baseUrl
        },
        jwt: async ({ token, user, account, profile, isNewUser }) => {
          if (typeof user !== typeof undefined) token.user = user;
    
          return token
        },
        async session({ session, token, user }) {
            return session;
        },
    },
    providers: [
        GithubProvider({
            id: "github",
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }), 
        GoogleProvider({
            id: "google",
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }), 
        FacebookProvider({
            id: "facebook",
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }), 
        AppleProvider({
            id: "apple",
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const { username, password } = credentials;

                try {
                
                    const user = await prisma.user.findFirst({
                        where: {
                            username: username as string,
                        }
                    });

                    if (user !== null) {

                        const isValid = await bcrypt.compare(password as string, user.password as string);

                        if (isValid) {
                            return user;
                        } else {
                            return null;
                        }
                    } else {
                        throw new AuthError("NotFound");
                    }
            
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
});