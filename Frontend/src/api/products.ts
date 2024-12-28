import { post } from "../utils/Requests";

export const createProduct = async (token: string, body: any) => {
    const headers = { authorization: `Bearer ${token}` };    
    return post('/products', body, headers);
}