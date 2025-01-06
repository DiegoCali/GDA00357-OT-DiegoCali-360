import { get, post, del } from "../utils/Requests";

export const getCategories = async (token: string) => {
    const header = { authorization: `Bearer ${token}` };
    return await get("/categories", header);
}

export const createCategory = async (token: string, body: any) => {
    const header = { authorization: `Bearer ${token}` };    
    return await post("/categories", body, header);
}

export const getProducts = async (token: string, id: number) => {
    const header = { authorization: `Bearer ${token}` };
    return await get(`/categories/${id}/products`, header);
}

export const deleteCategory = async (token: string, id: number) => {
    const header = { authorization: `Bearer ${token}` };
    return await del(`/categories/${id}`, header);
}