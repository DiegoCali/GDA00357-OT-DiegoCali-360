export interface ControllerInterface {
    get: (req: Request, res: Response) => void;
    post: (req: Request, res: Response) => void;
    put: (req: Request, res: Response) => void;
    delete: (req: Request, res: Response) => void;
}