import { post, get, put, del } from "../utils/Requests";

export const createProduct = async (token: string, body: any) => {
    const headers = { authorization: `Bearer ${token}` };    
    return post('/products', body, headers);
}

export const getProductById = async (token: string, id: number) => {
    const headers = { authorization: `Bearer ${token}` };
    return get(`/products/${id}`, headers);
}

export const updateProduct = async (token: string, id: number, body: any) => {
    const headers = { authorization: `Bearer ${token}` };
    return put(`/products/${id}`, body, headers);
}

export const deleteProduct = async (token: string, id: number) => {
    const headers = { authorization: `Bearer ${token}` };
    return del(`/products/${id}`, headers);
}