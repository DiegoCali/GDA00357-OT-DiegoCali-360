import { ControllerInterface } from "../interfaces/controllerInterface";
import { User } from "../models/UserModel";
import { Request, Response } from "express";

export class UserController implements ControllerInterface {
    index(req: Request, res: Response): void {
        User.findAll().then((users) => {
            res.send(users);
        });
    }

    create(req: Request, res: Response): void {
        User.create(req.body).then((user) => {
            res.send(user);
        });
    }

    show(req: Request, res: Response): void {
        User.findByPk(req.params.id).then((user) => {
            res.send(user);
        });
    }

    update(req: Request, res: Response): void {
        User.update(req.body, {
            where: { id: req.params.id },
        }).then((result) => {
            res.send(result);
        });
    }

    delete(req: Request, res: Response): void {
        User.destroy({
            where: { id: req.params.id },
        }).then((result) => {
            res.send(result);
        });
    }
}