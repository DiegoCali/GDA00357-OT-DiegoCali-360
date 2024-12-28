import { post } from "../utils/Requests";

export const login = async (body: any) => {
    const response = await post("/login", body);
    return response;
}