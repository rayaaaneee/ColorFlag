import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const {auth, handlers, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
    }), GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
    }), FacebookProvider({
        clientId: process.env.FACEBOOK_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string,
    }), AppleProvider({
        clientId: process.env.APPLE_ID as string,
        clientSecret: process.env.APPLE_SECRET as string,
    })],
});