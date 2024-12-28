import { get, post } from "../utils/Requests";

export const getCategories = async (token: string) => {
    const header = { authorization: `Bearer ${token}` };
    return await get("/categories", header);
}

export const createCategory = async (token: string, user_id: number, category_name: string) => {
    const header = { authorization: `Bearer ${token}` };
    const body = { user_id, category_name };
    return await post("/categories", body, header);
}

export const getProducts = async (token: string, id: number) => {
    const header = { authorization: `Bearer ${token}` };
    return await get(`/categories/${id}/products`, header);
}