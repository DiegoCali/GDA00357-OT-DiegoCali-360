import { get } from "../utils/Requests";

export const getOrders = async (token: string) => {
    const header = { authorization: `Bearer ${token}` };
    return await get("/orders", header);
}