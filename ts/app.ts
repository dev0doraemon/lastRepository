// import "dotenv/config";
import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

import db from "./models";
import mainRouter from "./routes";

const app: Express = express();
app.set("port", process.env.PORT || 3000);
// console.log(process.env.PORT);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });
app.use("/", mainRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: Error = new Error(`${req.method} ${req.url} is not defined.`);
    res.locals.errCode = 404;
    next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    // if (err instanceof Error) {
    //     res.locals.message = err.message;
    // }
    res.locals.error =
        process.env.NODE_ENV !== "production" ? res.locals.errCode : {};
    res.status(res.locals.errCode || 500).json({ message: err.message });
    // res.status(res.locals.errCode || 500).send({ message: res.locals.errCode });
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "is listening.");
});
