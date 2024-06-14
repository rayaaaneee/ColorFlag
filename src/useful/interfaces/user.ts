interface User {
    id: string;
    username: string;
    email: string;
    password: string;

    [key: string]: any;
}

export default User;