import { post, get } from "../utils/Requests";

export const createProduct = async (token: string, body: any) => {
    const headers = { authorization: `Bearer ${token}` };    
    return post('/products', body, headers);
}

export const getProductById = async (token: string, id: number) => {
    const headers = { authorization: `Bearer ${token}` };
    return get(`/products/${id}`, headers);
}