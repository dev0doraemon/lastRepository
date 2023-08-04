import Express, { Request, Response, NextFunction } from "express";

const router: Express.Router = Express.Router();

router.get("/", (req: Express.Request, res: Express.Response) => {
    res.send("!!");
});

export default router;
