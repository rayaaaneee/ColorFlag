interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    name?: string;

    [key: string]: any;
}

export default User;