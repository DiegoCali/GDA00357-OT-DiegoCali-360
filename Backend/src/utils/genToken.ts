import { sign, verify } from "jsonwebtoken";

export const genToken = (user: any): string => {
    const token = sign( {
        data: user
        },
        process.env.JWT_SECRET as string,
        { expiresIn: 60 * 60 * 24 }
    );
    return token;
}

export const verifyToken = (token: string): any => {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    return decoded;
}