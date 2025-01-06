import { post, get } from "../utils/Requests";

export const login = async (body: any) => {
    const response = await post("/login", body);
    return response;
}

export const checkState = async (state_id: number) => {
    const response = await get(`/checkState/${state_id}`);
    return response;
}