import { get } from "../utils/Requests";

export const getTops = async (token: string, kind: string) => {
    const header = { authorization: `Bearer ${token}` };
    return get(`/dashboard/${kind}/tops`, header);    
};

export const getActives = async (token: string) => {
    const header = { authorization: `Bearer ${token}` };
    return get('/dashboard/actives', header);
}