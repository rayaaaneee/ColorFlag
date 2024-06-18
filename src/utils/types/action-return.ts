type ActionReturn<T = undefined> = {
    msg: string;
    status: "success" | "error";
    data?: T | T[];
} | undefined;

export default ActionReturn;