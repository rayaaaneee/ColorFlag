import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
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
        encode: async ({ token, secret }) => {
            return "";
        },
        decode: async ({ token, secret }) => {
            return {};
        },
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
            session.user = user;
            user.id
      
            let userDetails = await prisma.user.findUnique({
              where: {
                id: user.id,
              },
            });

            if (!userDetails) {
              return session;
            }
            session.user = userDetails;
      
            return session;
          },
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }), 
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }), 
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }), 
        AppleProvider({
            clientId: process.env.APPLE_ID as string,
            clientSecret: process.env.APPLE_SECRET as string,
        }),
        CredentialsProvider({
            id: "default",
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
                            password: password as string,
                        }
                    });

                    if (user !== null) {
                        return user;
                    } else {
                        return null;
                    }
            
                } catch (error: any) {
            
                    throw new Error("An error occurred while comparing the passwords");
                
                }
            },
        }),
    ],
});