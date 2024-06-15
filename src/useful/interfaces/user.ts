interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;


    [key: string]: any;
}

export default User;