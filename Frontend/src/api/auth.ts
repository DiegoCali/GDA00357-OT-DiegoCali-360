import { post } from "../utils/Requests";

export const login = async (email: string, password: string) => {
    const response = await post("/login", { email, password });
    return response;
}