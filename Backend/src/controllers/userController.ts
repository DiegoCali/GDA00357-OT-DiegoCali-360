import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";

export class UserController implements ControllerInterface {
    get(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    post(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    put(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}