import prisma from "@/lib/prisma";
import User from "@/utils/interfaces/user";
import API from "./types/api";
import { PrismaClient } from "@prisma/client";

class UserAPI extends API<User> {
    public readonly data;
    private static instance: UserAPI;

    private constructor() {
        super();
    }
}