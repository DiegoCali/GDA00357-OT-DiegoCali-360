import { get, post, put, del } from "../utils/Requests";

export const getUsers = async (token: string) => {
    const headers = { authorization: `Bearer ${token}` }
    return await get("/users", headers);
}

export const createOperator = async (token: string, body: any) => {
    const headers = { authorization: `Bearer ${token}` }    
    return await post("/register/operator", body, headers);
}

export const createCustomer = async (token: string, body: any) => {
    const headers = { authorization: `Bearer ${token}` }    
    return await post("/register/customer", body, headers);
}

export const getUserById = async (token: string, id: number) => {
    const headers = { authorization: `Bearer ${token}` }
    return await get(`/users/${id}`, headers);
}

export const getCustomerData = async (token: string, id: number) => {
    const headers = { authorization: `Bearer ${token}` }
    return await get(`/customer/${id}`, headers);
}

export const updateUser = async (token: string, id: number, body: any) => {
    const headers = { authorization: `Bearer ${token}` }
    return await put(`/users/${id}`, body, headers);
}

export const deleteUser = async (token: string, id: number) => {
    const headers = { authorization: `Bearer ${token}` }
    return await del(`/users/${id}`, headers);
}