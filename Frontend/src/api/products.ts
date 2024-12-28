import { post } from "../utils/Requests";

export const createProduct = async (token: string, c_id: number, u_id: number, name: string, brand: string, code: string, price: number, picture: string, stock: number) => {
    const headers = { authorization: `Bearer ${token}` };
    const body = { c_id, u_id, name, brand, code, price, picture, stock };
    return post('/products', body, headers);
}