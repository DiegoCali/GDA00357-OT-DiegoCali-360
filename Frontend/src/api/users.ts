import { get, post } from "../utils/Requests";
import { phoneValidation, emailValidation } from "../utils/Validations";

export const getUsers = async (token: string) => {
    const headers = { authorization: `Bearer ${token}` }
    return await get("/users", headers);
}

export const createOperator = async (token: string, mail: string, name: string, password: string, phone: string, bdate: string ) => {
    const headers = { authorization: `Bearer ${token}` }
    if (!emailValidation(mail)) {
        throw new Error("Invalid email");
    }
    if (!phoneValidation(phone)) {
        throw new Error("Invalid phone");
    }
    const body = {
        email: mail,
        user_name: name,
        user_password: password,
        phone: phone,
        birth_date: bdate
    }
    return await post("/register/operator", body, headers);
}

export const createCustomer = async (token: string, mail: string, name: string, password: string, phone: string, bdate: string, cy_name: string, cm_name: string, address: string, c_phone: string, c_mail: string) => {
    const headers = { authorization: `Bearer ${token}` }
    if (!emailValidation(mail)) {
        throw new Error("Invalid email");
    }
    if (!phoneValidation(phone)) {
        throw new Error("Invalid phone");
    }
    if (!phoneValidation(c_phone)) {
        throw new Error("Invalid phone");
    }
    if (!emailValidation(c_mail)) {
        throw new Error("Invalid email");
    }    
    const body = {
        email: mail,
        user_name: name,
        user_password: password,
        phone: phone,
        birth_date: bdate,
        cy_name: cy_name,
        cm_name: cm_name,
        address: address,
        c_phone: c_phone,
        c_email: c_mail
    }
    return await post("/register/customer", body, headers);
}