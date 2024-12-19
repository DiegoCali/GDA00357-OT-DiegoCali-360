import { verifyToken } from "../utils/webToken";


export const checkAuth = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = verifyToken(token);
        console.log(tokenData);
        if (tokenData._id) {
            next();
        } else {
            res.status(401).send({ error: "Unauthorized" });
        }
    } catch (error) {
        res.status(401).send({ error: "Unauthorized" });
    }
}
