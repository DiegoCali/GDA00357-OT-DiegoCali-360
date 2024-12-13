import { Request, Response } from 'express';

export interface ControllerInterface {
    insert: (req: Request, res: Response) => void;
    update: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
    select: (req: Request, res: Response) => void;
}