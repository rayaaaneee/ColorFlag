interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    emailVerified: Date | null;
    image: string | null;
}

export default User;