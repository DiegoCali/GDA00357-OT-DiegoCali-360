import { get, post } from "../utils/Requests";

export const getOrders = async (token: string, id:number) => {
    const header = { authorization: `Bearer ${token}` };
    console.log("Query to get orders by user id:", id);
    return await get(`/orders/${id}/user`, header);
}

export const createOrder = async (token: string, body: any) => {
    const header = { authorization: `Bearer ${token}` };
    return await post("/orders", body, header);
}

export const getOrderDetails = async (token: string, id: number) => {
    const header = { authorization: `Bearer ${token}` };
    return await get(`/orders/${id}`, header);
}