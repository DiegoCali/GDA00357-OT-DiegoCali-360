import { get, post } from "../utils/Requests";

export const getOrders = async (token: string) => {
    const header = { authorization: `Bearer ${token}` };
    return await get("/orders", header);
}

export const createOrder = async (token: string, body: any) => {
    const header = { authorization: `Bearer ${token}` };
    return await post("/orders", body, header);
}